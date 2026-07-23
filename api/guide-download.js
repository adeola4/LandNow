var getSheetUrl = function () {
  return [process.env.SUBMISSION_SHEET, process.env.SUBMISSION_SHEET_URL, process.env.GOOGLE_SCRIPT_URL, process.env.GOOGLE_APPS_SCRIPT_URL, process.env.GOOGLE_SHEETS_URL, process.env.SHEET_URL, process.env.SUBMISSION_GOOGLE_SHEET].find(Boolean) || null;
};

var submitToSheet = async function (sheetUrl, payload) {
  var attempts = [
    { contentType: 'application/json', body: JSON.stringify(payload) },
    { contentType: 'application/x-www-form-urlencoded;charset=UTF-8', body: new URLSearchParams(payload).toString() }
  ];

  var lastError = null;

  for (var _i = 0; _i < attempts.length; _i++) {
    var attempt = attempts[_i];
    var controller = new AbortController();
    var timeout = setTimeout(function () { controller.abort(); }, 10000);

    try {
      var response = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': attempt.contentType },
        body: attempt.body,
        signal: controller.signal
      });

      if (response.ok) return;

      var errorText = await response.text().catch(function () { return ''; });
      lastError = new Error('Sheet responded with ' + response.status + ': ' + errorText);
    } catch (err) {
      lastError = err;
    } finally {
      clearTimeout(timeout);
    }
  }

  throw lastError;
};

var path = require('path');
var fs = require('fs');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).send('');
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var _ref = req.body || {},
    name = _ref.name,
    email = _ref.email,
    phone = _ref.phone;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'Name, email, and phone are required to access the guide.' });
  }

  var sheetUrl = getSheetUrl();
  var webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  var timestamp = new Date().toISOString();
  var userAgent = req.headers['user-agent'] || '';
  var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  var ipUserAgent = clientIp ? clientIp + ' | ' + userAgent : userAgent;

  var payload = {
    Sheet: 'Newsletter',
    Timestamp: timestamp,
    Name: name,
    Email: email,
    Phone: phone,
    Source: 'guide-popup',
    'IP / User Agent': ipUserAgent,
    'Lead Type': 'guide-download'
  };

  if (sheetUrl) {
    try { await submitToSheet(sheetUrl, payload); } catch (err) { console.error('Sheet submission failed:', err.message || err); }
  }

  if (webhookUrl) {
    var embed = {
      embeds: [{
        title: 'Guide Downloaded',
        color: 0xb5925a,
        fields: [
          { name: 'Name', value: name, inline: true },
          { name: 'Email', value: email, inline: true },
          { name: 'Phone', value: phone, inline: true },
          { name: 'Submitted', value: new Date().toUTCString(), inline: false }
        ],
        footer: { text: 'LandNow Guide Downloads' }
      }]
    };
    try { await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(embed) }); } catch (err) { console.error('Discord webhook failed:', err.message || err); }
  }

  var pdfPath = path.join(__dirname, '..', 'LandNow_Checklists_and_Infographics.pdf');
  if (!fs.existsSync(pdfPath)) {
    return res.status(500).json({ error: 'Resource not available. Please contact support.' });
  }

  var fileBuffer = fs.readFileSync(pdfPath);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="LandNow-Checklists-and-Infographics.pdf"');
  res.setHeader('Content-Length', fileBuffer.length);
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).send(fileBuffer);
};
