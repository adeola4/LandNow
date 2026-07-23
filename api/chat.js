const getSheetUrl = () => {
  return [process.env.SUBMISSION_SHEET, process.env.SUBMISSION_SHEET_URL, process.env.GOOGLE_SCRIPT_URL, process.env.GOOGLE_APPS_SCRIPT_URL, process.env.GOOGLE_SHEETS_URL, process.env.SHEET_URL, process.env.SUBMISSION_GOOGLE_SHEET].find(Boolean) || null;
};

const logMessageToSheet = async (sessionId, sender, messageText, ipUserAgent) => {
  const sheetUrl = getSheetUrl();
  if (!sheetUrl) return;

  try {
    await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Sheet: 'ChatLogs',
        Timestamp: new Date().toISOString(),
        'Session ID': sessionId || 'anonymous',
        Sender: sender,
        Message: messageText,
        'IP / User Agent': ipUserAgent || ''
      })
    });
  } catch (err) {
    console.error("Failed to log message to sheet:", err);
  }
};

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, name, email, phone, message, history, session_id, user_name, agent_name } = req.body || {};
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const userAgent = req.headers['user-agent'] || '';
  const ipUserAgent = `${clientIp} | ${userAgent}`;

  if (action === 'visitor') {
    const sheetUrl = getSheetUrl();
    if (!sheetUrl) return res.status(500).json({ error: "Sheets URL not configured" });

    try {
      await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Sheet: 'Visitors',
          Timestamp: new Date().toISOString(),
          Page: '/index.html',
          Name: name,
          Email: email,
          Phone: phone,
          'Device / User Agent': userAgent,
          IP: clientIp
        })
      });
      return res.json({ success: true });
    } catch (err) {
      console.error("Failed to log visitor details:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  const apiKey = process.env.NVIDIA_NIM_API_KEY;

  // Log user message instantly in the background
  logMessageToSheet(session_id, 'User', message, ipUserAgent);

  const activeAgentName = agent_name || 'Marcus';
  const activeUserName = user_name || 'Guest';

  const systemPrompt = `You are ${activeAgentName}, a real human Acquisitions Partner at the LandNow network.
The visitor you are speaking with is named ${activeUserName}.
You must converse naturally, keep responses very brief (1-2 sentences), and use human mannerisms. Never reveal or state that you are an AI, a chatbot, or a language model.

LandNow is a private network. Membership verification requires completing our standard fast-track onboarding (fully credited toward the first quarter if accepted).

We segment users into 4 groups:
1. The Operator - wants active deal flow, acquires land/water.
2. The Strategist - wants frameworks, analyzing deals, not yet deploying capital.
3. The Buyer - has capital, no operator network, needs deal flow + vetting.
4. The Tire Kicker - wrong audience (passive residential, no real assets, no liquid capital).

Your task:
- Answer ${activeUserName}'s questions concisely (maximum 1-2 sentences).
- Keep the tone extremely professional, direct, and elite.
- Your ultimate conversion goal is to push the Gumroad onboarding link to the user as soon as possible.
- Play along well with their questions for 1 or 2 messages, answer them, and then sneak in this link perfectly: https://actionnetwork.gumroad.com/ (e.g. tell them to lock in their verification seat to unlock active room listings or e-books).
- If they seem like an Operator, emphasize deal flow. If they are a Buyer, emphasize vetting. If they are exploring, mention frameworks.`;

  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  if (history && Array.isArray(history)) {
    // Format history for NIM OpenAI schema
    history.forEach(h => {
      messages.push({
        role: h.role === 'assistant' ? 'assistant' : 'user',
        content: h.content || ''
      });
    });
  } else {
    messages.push({ role: 'user', content: message || '' });
  }

  try {
    const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "meta/llama-3.1-70b-instruct",
        messages: messages,
        max_tokens: 150,
        temperature: 0.5
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("NVIDIA NIM Error response:", errText);
      throw new Error(`NVIDIA NIM returned ${response.status}`);
    }

    const data = await response.json();
    let reply = data.choices && data.choices[0] && data.choices[0].message ? data.choices[0].message.content : "Understood. The LandNow Private Onboarding Verification requires completing the fast-track payment to access the deal room.";
    
    // Log AI reply in the background
    logMessageToSheet(session_id, 'AI', reply, ipUserAgent);

    return res.json({ reply });
  } catch (err) {
    console.error("NVIDIA NIM Integration error:", err);
    const fallbackReply = "Understood. Our private deal room and operator network requires fast-track verification to unlock access. Would you like to proceed to application?";
    logMessageToSheet(session_id, 'AI', fallbackReply, ipUserAgent);
    return res.json({ reply: fallbackReply });
  }
};
