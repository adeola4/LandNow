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

  if (req.method === 'GET') {
    return res.json({
      whopLink: process.env.WHOP_LINK || null,
      sheetUrl: getSheetUrl() ? 'configured' : null
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  var _ref = req.body || {},
    name = _ref.name,
    email = _ref.email,
    phone = _ref.phone,
    location = _ref.location,
    company = _ref.company,
    experience = _ref.experience,
    investmentRange = _ref.investmentRange,
    referral = _ref.referral,
    socialMedia = _ref.socialMedia,
    handle = _ref.handle,
    message = _ref.message,
    confirmed = _ref.confirmed,
    admissionType = _ref.admissionType,
    barterContribution = _ref.barterContribution,
    funnelCategory = _ref.funnelCategory,
    assetDetails = _ref.assetDetails,
    domain = _ref.domain,
    accepted = _ref.accepted;

  if (!email) {
    return res.status(400).json({ error: 'Email is required.' });
  }
  if (!name && accepted === undefined && !domain) {
    return res.status(400).json({ error: 'Name and email are required for full applications.' });
  }

  if (admissionType === 'barter') {
    return res.status(400).json({ error: 'Barter applications are only available for high-ticket partnership offers. Standard onboarding requires payment.' });
  }

  var sheetUrl = getSheetUrl();
  var webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  var timestamp = _ref.timestamp || new Date().toISOString();
  var userAgent = req.headers['user-agent'] || '';
  var clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  var ipUserAgent = clientIp ? clientIp + ' | ' + userAgent : userAgent;

  var payload = {
    Timestamp: timestamp,
    Name: name || 'Domain Lead',
    Email: email,
    Domain: domain || req.headers['x-forwarded-host'] || req.headers.host || 'landnow.com',
    Accepted: accepted !== undefined ? String(accepted) : 'true',
    Sheet: _ref.Sheet || ((domain || accepted !== undefined) ? 'DomainContracts' : 'Entries'),
    Phone: phone || '',
    Location: location || '',
    'Company/Role': company || '',
    Experience: experience || '',
    'Investment Range': investmentRange || '',
    Referral: referral || '',
    'Social Media': socialMedia || '',
    Handle: handle || '',
    Message: message || '',
    Confirmed: confirmed ? 'Yes' : '',
    Source: (domain || accepted !== undefined) ? 'domain-contract-accept' : 'membership-form',
    'Admission Type': admissionType || 'payment',
    'Barter Proposal': barterContribution || '',
    'Funnel Category': funnelCategory || '',
    'Asset Details': assetDetails || '',
    'IP / User Agent': ipUserAgent
  };

  if (sheetUrl) {
    try {
      await submitToSheet(sheetUrl, payload);
    } catch (err) {
      console.error('Sheet submission failed:', err.message || err);
    }
  }

  if (webhookUrl) {
    var title = 'New Membership Application';
    var color = 0xb5925a; // Default Gold/Brown

    if (funnelCategory === 'Cash Investor') {
      title = 'New Application: Cash Investor 💰';
      color = 0x2ecc71; // Emerald Green
    } else if (funnelCategory === 'Asset Owner') {
      title = 'New Application: Asset Owner 🌾';
      color = 0x3498db; // Blue
    } else if (funnelCategory === 'Tire Kicker') {
      title = 'New Application: Tire Kicker 💬';
      color = 0x95a5a6; // Grey
    }

    if (confirmed) {
      title += ' (Confirmed)';
      color = 0x27ae60; // Darker Green
    } else if (admissionType === 'barter' && funnelCategory !== 'Tire Kicker') {
      title += ' (Barter Request)';
    }

    var fields = [
      { name: 'Name', value: name, inline: true },
      { name: 'Email', value: email, inline: true },
      { name: 'Phone', value: phone || '—', inline: true },
      { name: 'Location', value: location || '—', inline: true },
      { name: 'Company / Role', value: company || '—', inline: true },
      { name: 'Experience', value: experience || '—', inline: true },
      { name: 'Investment Range', value: investmentRange || '—', inline: true },
      { name: 'Referred By', value: referral || '—', inline: true },
      { name: 'Social Media', value: socialMedia || '—', inline: true },
      { name: 'Handle', value: handle || '—', inline: true },
      { name: 'Category', value: funnelCategory || '—', inline: true },
      { name: 'Admission Preference', value: admissionType === 'barter' ? 'Barter / Value Exchange' : (admissionType === 'free-pipeline' ? 'Free Resource Pipeline' : 'Standard Fast-Track'), inline: true }
    ];

    if (funnelCategory === 'Asset Owner' && assetDetails) {
      fields.push({ name: 'Owned Asset Details', value: assetDetails, inline: false });
    }

    if (admissionType === 'barter') {
      fields.push({ name: 'Barter Proposal', value: barterContribution || '—', inline: false });
    }

    fields.push(
      { name: 'Message', value: message || '—', inline: false },
      { name: 'Status', value: confirmed ? 'Confirmed' : 'Web Form (Pending Payment)', inline: true },
      { name: 'Submitted', value: new Date().toUTCString(), inline: false }
    );

    var embed = {
      embeds: [{
        title: title,
        color: color,
        fields: fields,
        footer: { text: 'LandNow Applications' }
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
