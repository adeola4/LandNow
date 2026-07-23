const getSheetUrl = () => {
  return [
    process.env.SUBMISSION_SHEET,
    process.env.SUBMISSION_SHEET_URL,
    process.env.GOOGLE_SCRIPT_URL,
    process.env.GOOGLE_APPS_SCRIPT_URL,
    process.env.GOOGLE_SHEETS_URL,
    process.env.SHEET_URL,
    process.env.SUBMISSION_GOOGLE_SHEET
  ].find(Boolean) || null;
};

const submitToSheet = async (sheetUrl, payload) => {
  const attempts = [
    {
      contentType: 'application/json',
      body: JSON.stringify(payload)
    },
    {
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      body: new URLSearchParams(payload).toString()
    }
  ];

  let lastError = null;

  for (const attempt of attempts) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': attempt.contentType },
        body: attempt.body,
        signal: controller.signal
      });

      if (response.ok) {
        return;
      }

      const errorText = await response.text().catch(() => '');
      lastError = new Error(`Sheet update failed with ${response.status}: ${errorText}`);
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
};

module.exports = async (req, res) => {
  if (req.method !== 'GET' && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const query = req.method === 'GET' ? req.query || {} : req.body || {};
  const token = query.token || query.whop_token || query.whopToken || '';
  const email = query.email || '';
  const name = query.name || '';

  if (!token) {
    return res.status(400).json({ error: 'Missing Whop token' });
  }

  const sheetUrl = getSheetUrl();
  const payload = {
    Sheet: 'Entries',
    Timestamp: new Date().toISOString(),
    Name: name,
    Email: email,
    Confirmed: 'Confirmed',
    Status: 'Confirmed',
    Source: 'whop-callback',
    'IP / User Agent': '',
    token,
    email,
    name,
    status: 'Confirmed',
    paymentStatus: 'Confirmed',
    confirmed: 'Confirmed',
    confirmationStatus: 'Confirmed',
    confirmedAt: new Date().toISOString(),
    source: 'whop-callback'
  };

  if (sheetUrl) {
    try {
      await submitToSheet(sheetUrl, payload);
      return res.json({ success: true, message: 'Payment confirmed.' });
    } catch (err) {
      console.error('Whop callback sheet update failed:', err);
      return res.status(502).json({ success: false, error: 'Unable to update the sheet.' });
    }
  }

  return res.json({ success: true, message: 'Payment confirmed locally.' });
};
