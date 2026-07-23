const fs = require('fs');

// Load .env.local variables
let env = {};
try {
  const content = fs.readFileSync('.env.local', 'utf8');
  content.split('\n').forEach(line => {
    const [key, ...val] = line.split('=');
    if (key && val.length) {
      env[key.trim()] = val.join('=').replace(/^["']|["']$/g, '').trim();
    }
  });
} catch (e) {
  console.log("Could not read .env.local", e);
}

const discordWebhook = env.DISCORD_WEBHOOK_URL;
const sheetsUrls = [
  env.SUBMISSION_SHEET,
  "https://script.google.com/macros/s/AKfycbzN9txc1aex9ht81JOO0f7jw8qdG8hhMxqU2UpfYzLMB5PrnXReLsFPOSEtOGoIpxc9gQ/exec"
].filter(Boolean);

console.log("Discord Webhook URL:", discordWebhook);
console.log("Sheets URLs to test:", sheetsUrls);

const payload = {
  name: 'Antigravity Test',
  email: 'test@antigravity.ai',
  phone: '+1 (555) 999-9999',
  location: 'San Francisco, CA',
  company: 'Google DeepMind',
  experience: 'Accredited investor — active in real assets',
  investmentRange: '$500K – $1M',
  referral: 'User Request Test',
  socialMedia: 'Discord',
  handle: '@antigravity_test',
  message: 'This is a test submission verifying Google Sheets and Discord webhook integration.',
  admissionType: 'barter',
  barterContribution: 'Offering high-quality off-market agricultural deal flow and water rights research.'
};

async function runTest() {
  // Test Discord Webhook
  if (discordWebhook) {
    const embed = {
      embeds: [{
        title: 'New Membership Application [TEST]',
        color: 0xb5925a,
        fields: [
          { name: 'Name', value: payload.name, inline: true },
          { name: 'Email', value: payload.email, inline: true },
          { name: 'Phone', value: payload.phone, inline: true },
          { name: 'Location', value: payload.location, inline: true },
          { name: 'Company / Role', value: payload.company, inline: true },
          { name: 'Experience', value: payload.experience, inline: true },
          { name: 'Investment Range', value: payload.investmentRange, inline: true },
          { name: 'Referred By', value: payload.referral, inline: true },
          { name: 'Social Media', value: payload.socialMedia, inline: true },
          { name: 'Handle', value: payload.handle, inline: true },
          { name: 'Message', value: payload.message, inline: false },
          { name: 'Confirmed', value: 'No', inline: true },
          { name: 'Submitted', value: new Date().toUTCString(), inline: false }
        ],
        footer: { text: 'LandNow Applications Test' }
      }]
    };

    try {
      console.log("Sending to Discord...");
      const res = await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(embed)
      });
      console.log(`Discord response status: ${res.status}`);
    } catch (err) {
      console.error("Discord error:", err);
    }
  }

  // Test Sheets URLs
  for (const sheetUrl of sheetsUrls) {
    const sheetPayload = {
      Timestamp: new Date().toISOString(),
      Name: payload.name,
      Email: payload.email,
      Phone: payload.phone,
      Location: payload.location,
      'Company/Role': payload.company,
      Experience: payload.experience,
      'Investment Range': payload.investmentRange,
      Referral: payload.referral,
      'Social Media': payload.socialMedia,
      Handle: payload.handle,
      Message: payload.message,
      Confirmed: 'No',
      Source: 'membership-form-test',
      'Admission Type': payload.admissionType,
      'Barter Proposal': payload.barterContribution,
      'IP / User Agent': '127.0.0.1 | Antigravity Test Client'
    };

    try {
      console.log(`Sending to Sheets URL: ${sheetUrl}...`);
      const res = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sheetPayload)
      });
      console.log(`Sheets response status: ${res.status}`);
      const text = await res.text();
      console.log(`Sheets response: ${text}`);
    } catch (err) {
      console.error(`Sheets error for ${sheetUrl}:`, err);
    }
  }

  // Test DomainLeads contract acceptance submission
  for (const sheetUrl of sheetsUrls) {
    const domainPayload = {
      Timestamp: new Date().toISOString(),
      Email: 'outreach.prospect@domain-test.com',
      Domain: 'landnow.com',
      Accepted: 'true',
      Sheet: 'DomainLeads'
    };

    try {
      console.log(`Testing DomainLeads Contract Acceptance on ${sheetUrl}...`);
      const res = await fetch(sheetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(domainPayload)
      });
      console.log(`DomainLeads response status: ${res.status}`);
      const text = await res.text();
      console.log(`DomainLeads response: ${text}`);
    } catch (err) {
      console.error(`DomainLeads error for ${sheetUrl}:`, err);
    }
  }
}

runTest();
