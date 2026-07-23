var getSheetUrl = function () {
  return [process.env.SUBMISSION_SHEET, process.env.SUBMISSION_SHEET_URL, process.env.GOOGLE_SCRIPT_URL, process.env.GOOGLE_APPS_SCRIPT_URL, process.env.GOOGLE_SHEETS_URL, process.env.SHEET_URL, process.env.SUBMISSION_GOOGLE_SHEET].find(Boolean) || null;
};

var submitToSheet = async function (sheetUrl, payload) {
  var attempts = [
    {
      contentType: 'application/json',
      body: JSON.stringify(payload)
    },
    {
      contentType: 'application/x-www-form-urlencoded;charset=UTF-8',
      body: new URLSearchParams(payload).toString()
    }
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

      if (response.ok) {
        var text = await response.text().catch(function() { return ''; });
        if (text && text.includes('Unknown sheet') && payload.Sheet !== 'Entries') {
          var fallbackPayload = Object.assign({}, payload, { Sheet: 'Entries' });
          return await submitToSheet(sheetUrl, fallbackPayload);
        }
        return;
      }

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

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var _ref = req.body || {},
    name = _ref.name,
    email = _ref.email,
    phone = _ref.phone,
    leadSource = _ref.leadSource,
    accepted = _ref.accepted,
    reqDomain = _ref.domain,
    reqSheet = _ref.Sheet || _ref.sheet;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }

  var sheetUrl = getSheetUrl();
  var webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  var timestamp = new Date().toISOString();
  var userAgent = req.headers['user-agent'] || '';
  var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  var ipUserAgent = clientIp ? clientIp + ' | ' + userAgent : userAgent;

  var detectedDomain = reqDomain || req.headers['x-forwarded-host'] || req.headers.host || 'landnow.com';

  var isContractAcceptance = accepted === true || accepted === 'true' || reqSheet === 'DomainContracts' || reqSheet === 'DomainLeads';
  var targetSheet = reqSheet || (isContractAcceptance ? 'DomainContracts' : 'Newsletter');

  var payload;
  if (isContractAcceptance) {
    payload = {
      Sheet: targetSheet,
      Timestamp: timestamp,
      Email: email,
      Domain: detectedDomain,
      Accepted: 'true',
      Source: leadSource || 'provisional-contract',
      'IP / User Agent': ipUserAgent
    };
  } else {
    payload = {
      Sheet: targetSheet,
      Timestamp: timestamp,
      Name: name || '',
      Email: email,
      Phone: phone || '',
      Source: leadSource || 'lead-popup',
      'IP / User Agent': ipUserAgent,
      'Lead Type': 'email-capture'
    };
  }

  if (sheetUrl) {
    try {
      await submitToSheet(sheetUrl, payload);
    } catch (err) {
      console.error('Sheet submission failed:', err.message || err);
    }
  }

  if (webhookUrl) {
    var embedTitle = isContractAcceptance ? '📜 Provisional Contract Accepted' : 'New Lead Captured';
    var embedFields = isContractAcceptance ? [
      { name: 'Email', value: email, inline: true },
      { name: 'Domain', value: detectedDomain, inline: true },
      { name: 'Status', value: 'Accepted (Provisional Contract)', inline: true },
      { name: 'Timestamp', value: new Date().toUTCString(), inline: false }
    ] : [
      { name: 'Name', value: name || '—', inline: true },
      { name: 'Email', value: email, inline: true },
      { name: 'Phone', value: phone || '—', inline: true },
      { name: 'Source', value: leadSource || 'lead-popup', inline: true },
      { name: 'Submitted', value: new Date().toUTCString(), inline: false }
    ];

    var embed = {
      embeds: [{
        title: embedTitle,
        color: isContractAcceptance ? 0x27ae60 : 0xb5925a,
        fields: embedFields,
        footer: { text: 'LandNow Lead Capture' }
      }]
    };
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embed)
      });
    } catch (err) {
      console.error('Discord webhook failed:', err.message || err);
    }
  }

  res.json({ success: true });
};
