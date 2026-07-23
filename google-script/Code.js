var SHEET_ID = "1jYiAaAgi5FO0revNHVj-mVBzRA7ach8YzaAkaPRTjIM";

// Sheet definitions: headers + the fields that map to each column
var SHEET_CONFIG = {
  "Entries": {
    headers: [
      "Timestamp",
      "Session ID",
      "Name",
      "Email",
      "Phone",
      "Location",
      "Company / Role",
      "Experience",
      "Investment Range",
      "Referral",
      "Social Media",
      "Handle",
      "Message",
      "Confirmed",
      "Source",
      "Admission Type",
      "Barter Proposal",
      "Funnel Category",
      "Asset Details",
      "IP / User Agent"
    ],
    required: [],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp", "submittedAt") || new Date().toISOString(),
        pick(data, "Session ID", "session_id", "sessionId"),
        pick(data, "Name", "name"),
        pick(data, "Email", "email"),
        pick(data, "Phone", "phone"),
        pick(data, "Location", "location"),
        pick(data, "Company / Role", "company"),
        pick(data, "Experience", "experience"),
        pick(data, "Investment Range", "investmentRange"),
        pick(data, "Referral", "referral"),
        pick(data, "Social Media", "socialMedia"),
        pick(data, "Handle", "handle"),
        pick(data, "Message", "message"),
        pick(data, "Confirmed", "status", "paymentStatus", "confirmed") || "Pending Payment",
        pick(data, "Source", "source") || "membership-form",
        pick(data, "Admission Type", "admissionType") || "payment",
        pick(data, "Barter Proposal", "barterContribution", "barterProposal"),
        pick(data, "Funnel Category", "funnelCategory"),
        pick(data, "Asset Details", "assetDetails"),
        pick(data, "IP / User Agent", "ipAddress")
      ];
    }
  },
  "Newsletter": {
    headers: [
      "Timestamp",
      "Email",
      "Name",
      "Source",
      "Subscribed",
      "IP / User Agent"
    ],
    required: ["Email"],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp", "submittedAt") || new Date().toISOString(),
        pick(data, "Email", "email"),
        pick(data, "Name", "name"),
        pick(data, "Source", "source") || "newsletter-signup",
        pick(data, "Subscribed", "subscribed", "status") || "Subscribed",
        pick(data, "IP / User Agent", "ipAddress")
      ];
    }
  },
  "Visitors": {
    headers: [
      "Timestamp",
      "Page",
      "Referrer",
      "UTM Source",
      "UTM Medium",
      "UTM Campaign",
      "Device / User Agent",
      "IP",
      "Name",
      "Email",
      "Phone"
    ],
    required: [],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp", "submittedAt") || new Date().toISOString(),
        pick(data, "Page", "page", "path", "url"),
        pick(data, "Referrer", "referrer", "referer"),
        pick(data, "UTM Source", "utm_source", "utmSource"),
        pick(data, "UTM Medium", "utm_medium", "utmMedium"),
        pick(data, "UTM Campaign", "utm_campaign", "utmCampaign"),
        pick(data, "Device / User Agent", "userAgent", "user_agent", "device"),
        pick(data, "IP", "ip", "ipAddress"),
        pick(data, "Name", "name"),
        pick(data, "Email", "email"),
        pick(data, "Phone", "phone")
      ];
    }
  },
  "QuizQuestions": {
    headers: ["id", "layer", "parent_option", "question_text", "option_a_text", "option_a_key", "option_b_text", "option_b_key", "active", "is_variant", "variant_parent_id"],
    required: ["id"],
    buildRow: function (data) {
      return [
        pick(data, "id"),
        pick(data, "layer"),
        pick(data, "parent_option"),
        pick(data, "question_text"),
        pick(data, "option_a_text"),
        pick(data, "option_a_key"),
        pick(data, "option_b_text"),
        pick(data, "option_b_key"),
        String(pick(data, "active") !== undefined ? pick(data, "active") : "true"),
        String(pick(data, "is_variant") !== undefined ? pick(data, "is_variant") : "false"),
        pick(data, "variant_parent_id")
      ];
    }
  },
  "QuizAnalytics": {
    headers: ["step", "question_id", "option_key", "option_text", "views", "clicks", "completion_rate", "drop_off_count", "last_10_conversions", "avg_path_to_segment", "sample_size", "updated_at"],
    required: ["question_id"],
    buildRow: function (data) {
      return [
        pick(data, "step"),
        pick(data, "question_id"),
        pick(data, "option_key"),
        pick(data, "option_text"),
        Number(pick(data, "views") || 0),
        Number(pick(data, "clicks") || 0),
        Number(pick(data, "completion_rate") || 0),
        Number(pick(data, "drop_off_count") || 0),
        Number(pick(data, "last_10_conversions") || 0),
        pick(data, "avg_path_to_segment"),
        Number(pick(data, "sample_size") || 0),
        pick(data, "updated_at") || new Date().toISOString()
      ];
    }
  },
  "QuizVersionHistory": {
    headers: ["version", "active", "replaced_by", "replaced_at", "reason"],
    required: ["version"],
    buildRow: function (data) {
      return [
        pick(data, "version"),
        String(pick(data, "active") !== undefined ? pick(data, "active") : "true"),
        pick(data, "replaced_by"),
        pick(data, "replaced_at") || new Date().toISOString(),
        pick(data, "reason")
      ];
    }
  },
  "ChatLogs": {
    headers: ["Timestamp", "Session ID", "Sender", "Message", "IP / User Agent"],
    required: ["session_id", "message"],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp") || new Date().toISOString(),
        pick(data, "Session ID", "session_id", "sessionId"),
        pick(data, "Sender", "sender"),
        pick(data, "Message", "message"),
        pick(data, "IP / User Agent", "ipAddress")
      ];
    }
  },
  "DomainLeads": {
    headers: ["Timestamp", "Email", "Domain", "Accepted"],
    required: ["Email"],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp") || new Date().toISOString(),
        pick(data, "Email", "email"),
        pick(data, "Domain", "domain") || "unknown-domain",
        String(pick(data, "Accepted", "accepted") !== undefined ? pick(data, "Accepted", "accepted") : "true")
      ];
    }
  },
  "DomainContracts": {
    headers: ["Timestamp", "Email", "Domain", "Accepted"],
    required: ["Email"],
    buildRow: function (data) {
      return [
        pick(data, "Timestamp", "timestamp") || new Date().toISOString(),
        pick(data, "Email", "email"),
        pick(data, "Domain", "domain") || "unknown-domain",
        String(pick(data, "Accepted", "accepted") !== undefined ? pick(data, "Accepted", "accepted") : "true")
      ];
    }
  }
};

// Case-insensitive / alias-aware field lookup
function pick(data) {
  var aliases = Array.prototype.slice.call(arguments, 1);
  for (var i = 0; i < aliases.length; i++) {
    var key = aliases[i];
    if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
      return data[key];
    }
    // case-insensitive fallback
    for (var k in data) {
      if (k.toLowerCase() === key.toLowerCase() && data[k] !== "") {
        return data[k];
      }
    }
  }
  return "";
}

function getDoc() {
  var doc;
  try {
    doc = SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    // bound script fails if run standalone
  }
  if (!doc) {
    doc = SpreadsheetApp.openById(SHEET_ID);
  }
  return doc;
}

// Create any missing sheets with their header rows. Run once from the editor.
function setupSheets() {
  var doc = getDoc();
  for (var name in SHEET_CONFIG) {
    ensureSheet(doc, name, SHEET_CONFIG[name].headers);
  }
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: "Sheets ready: " + Object.keys(SHEET_CONFIG).join(", ")
  })).setMimeType(ContentService.MimeType.JSON);
}

function ensureSheet(doc, sheetName, headers) {
  var sheet = doc.getSheetByName(sheetName);
  if (!sheet) {
    sheet = doc.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
  } else {
    var maxCol = Math.max(sheet.getLastColumn(), 1);
    var currentHeaders = sheet.getRange(1, 1, 1, maxCol).getValues()[0];
    var cleanHeaders = currentHeaders.map(function (h) {
      return String(h || '').trim();
    });

    for (var i = 0; i < headers.length; i++) {
      var targetHeader = headers[i];
      var cleanTarget = String(targetHeader).trim();
      var foundIdx = cleanHeaders.indexOf(cleanTarget);

      if (foundIdx === -1) {
        var colIndex = i + 1;
        if (colIndex <= sheet.getLastColumn()) {
          sheet.insertColumnBefore(colIndex);
        }
        sheet.getRange(1, colIndex).setValue(targetHeader);
        cleanHeaders.splice(i, 0, cleanTarget);
      }
    }
  }
  // Freeze the header row
  sheet.setFrozenRows(1);
  return sheet;
}

function parseData(e) {
  var data = {};
  if (e && e.parameter) {
    for (var key in e.parameter) {
      data[key] = e.parameter[key];
    }
  }
  if (e && e.postData && e.postData.contents) {
    try {
      var json = JSON.parse(e.postData.contents);
      
      // Check if this is a Whop Webhook (contains an action/type and nested data object)
      var eventType = json.action || json.type;
      if (eventType && json.data && typeof json.data === 'object') {
        // Flatten the nested data object so nested properties (like email, name) are top-level
        for (var k in json.data) {
          data[k] = json.data[k];
        }
        
        // Map Whop event types to Confirmed status
        if (eventType === "payment.succeeded" || eventType === "membership.activated") {
          data["Confirmed"] = "Confirmed";
        } else if (eventType === "membership.deactivated") {
          data["Confirmed"] = "Cancelled";
        }
        
        data["Source"] = "Whop (" + eventType + ")";
      } else {
        // Normal flat JSON payload
        for (var k in json) {
          data[k] = json[k];
        }
      }
    } catch (err) {
      try {
        var pairs = e.postData.contents.split('&');
        for (var i = 0; i < pairs.length; i++) {
          var pair = pairs[i].split('=');
          var name = decodeURIComponent(pair[0]);
          var value = decodeURIComponent(pair[1] || '');
          if (name) {
            data[name] = value;
          }
        }
      } catch (err2) {
        // Ignore
      }
    }
  }
  return data;
}

function handleRequest(e) {
  var doc = getDoc();
  var data = parseData(e);
  var action = pick(data, "action", "Action");

  // Handle read action
  if (action === "read-sheet") {
    var sheetName = pick(data, "Sheet", "sheet");
    var sheet = doc.getSheetByName(sheetName);
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Sheet not found"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        data: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var values = sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).getValues();
    var rows = [];
    for (var r = 0; r < values.length; r++) {
      var rowObj = {};
      for (var c = 0; c < headers.length; c++) {
        rowObj[headers[c]] = values[r][c];
      }
      rows.push(rowObj);
    }
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      data: rows
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Handle append blank row
  if (action === "append-blank") {
    var sheetName = pick(data, "Sheet", "sheet");
    var sheet = doc.getSheetByName(sheetName);
    if (sheet) {
      sheet.appendRow([]);
      return ContentService.createTextOutput(JSON.stringify({
        success: true,
        message: "Blank row appended"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Sheet not found"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Handle bulk write action
  if (action === "write-sheet") {
    var sheetName = pick(data, "Sheet", "sheet");
    var rowsInput = data.rows;
    if (typeof rowsInput === 'string') {
      try { rowsInput = JSON.parse(rowsInput); } catch(err) {}
    }
    if (!rowsInput || !Array.isArray(rowsInput)) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Rows must be an array"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    var config = SHEET_CONFIG[sheetName];
    if (!config) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Unknown sheet"
      })).setMimeType(ContentService.MimeType.JSON);
    }
    var sheet = ensureSheet(doc, sheetName, config.headers);
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.deleteRows(2, lastRow - 1);
    }
    for (var i = 0; i < rowsInput.length; i++) {
      var row = config.buildRow(rowsInput[i]);
      sheet.appendRow(row);
    }
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Sheet updated successfully with " + rowsInput.length + " rows"
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Determine which sheet to write to
  var sheetName = pick(data, "Sheet", "sheet", "type");
  if (!sheetName) {
    if (pick(data, "domain", "Domain") || pick(data, "accepted", "Accepted") !== "") {
      sheetName = "DomainLeads";
    } else {
      sheetName = "Entries";
    }
  }

  // If writing to domain specific sheet (e.g. landnow.com) or DomainLeads, fall back to DomainLeads config
  var config = SHEET_CONFIG[sheetName];
  if (!config && (pick(data, "domain", "Domain") || pick(data, "accepted", "Accepted") !== "")) {
    config = SHEET_CONFIG["DomainLeads"];
  }

  if (!config) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "Unknown sheet '" + sheetName + "'. Valid: " + Object.keys(SHEET_CONFIG).join(", ")
    })).setMimeType(ContentService.MimeType.JSON);
  }

  // Validate required fields
  if (Object.keys(data).length === 0) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: "No data received."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  for (var r = 0; r < config.required.length; r++) {
    if (!pick(data, config.required[r])) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: "Missing required field: " + config.required[r]
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  var sheet = ensureSheet(doc, sheetName, config.headers);
  var row = config.buildRow(data);

  // Check if we should update an existing row (based on custom keys)
  var matchColIdx = -1;
  var matchValToFind = "";

  if (sheetName === "QuizQuestions") {
    // Match by ID
    for (var h = 0; h < config.headers.length; h++) {
      if (config.headers[h].toLowerCase() === "id") {
        matchColIdx = h;
        matchValToFind = pick(data, "id");
        break;
      }
    }
  } else if (sheetName === "QuizAnalytics") {
    // Match by question_id AND option_key
    var qIdIdx = -1;
    var optKeyIdx = -1;
    for (var h = 0; h < config.headers.length; h++) {
      if (config.headers[h].toLowerCase() === "question_id") qIdIdx = h;
      if (config.headers[h].toLowerCase() === "option_key") optKeyIdx = h;
    }
    var qIdToFind = pick(data, "question_id");
    var optKeyToFind = pick(data, "option_key");
    var existingRowIndex = -1;
    var lastRow = sheet.getLastRow();
    if (lastRow > 1 && qIdIdx !== -1 && optKeyIdx !== -1 && qIdToFind) {
      var qIdValues = sheet.getRange(2, qIdIdx + 1, lastRow - 1, 1).getValues();
      var optKeyValues = sheet.getRange(2, optKeyIdx + 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < qIdValues.length; i++) {
        if (String(qIdValues[i][0]) === String(qIdToFind) && String(optKeyValues[i][0]) === String(optKeyToFind)) {
          existingRowIndex = i + 2;
          break;
        }
      }
    }
  } else {
    // Match by Session ID first, then fallback to Email/Name
    var existingRowIndex = -1;
    var lastRow = sheet.getLastRow();
    
    var sessionIdIndex = -1;
    for (var h = 0; h < config.headers.length; h++) {
      if (config.headers[h].toLowerCase() === "session id" || config.headers[h] === "Session ID") {
        sessionIdIndex = h;
        break;
      }
    }
    var sessionIdToFind = pick(data, "Session ID", "session_id", "sessionId");

    if (lastRow > 1 && sessionIdIndex !== -1 && sessionIdToFind) {
      var sessionValues = sheet.getRange(2, sessionIdIndex + 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < sessionValues.length; i++) {
        if (String(sessionValues[i][0]) === String(sessionIdToFind)) {
          existingRowIndex = i + 2;
          break;
        }
      }
    }

    if (existingRowIndex === -1 && lastRow > 1) {
      // Fallback matching: Email or Name
      var emailIndex = -1;
      var nameIndex = -1;
      for (var h = 0; h < config.headers.length; h++) {
        var headerLower = config.headers[h].toLowerCase();
        if (headerLower === "email") {
          emailIndex = h;
        } else if (headerLower === "name") {
          nameIndex = h;
        }
      }
      var emailToFind = pick(data, "Email", "email");
      var nameToFind = pick(data, "Name", "name");

      // 1. Try matching by Email first
      if (emailIndex !== -1 && emailToFind) {
        var emailValues = sheet.getRange(2, emailIndex + 1, lastRow - 1, 1).getValues();
        var cleanEmailToFind = String(emailToFind).toLowerCase().trim();
        for (var i = 0; i < emailValues.length; i++) {
          if (String(emailValues[i][0]).toLowerCase().trim() === cleanEmailToFind) {
            existingRowIndex = i + 2;
            break;
          }
        }
      }
      
      // 2. Fallback: Try matching by Name if email match fails
      if (existingRowIndex === -1 && nameIndex !== -1 && nameToFind) {
        var nameValues = sheet.getRange(2, nameIndex + 1, lastRow - 1, 1).getValues();
        var cleanNameToFind = String(nameToFind).toLowerCase().trim();
        for (var i = 0; i < nameValues.length; i++) {
          if (String(nameValues[i][0]).toLowerCase().trim() === cleanNameToFind) {
            existingRowIndex = i + 2;
            break;
          }
        }
      }
    }
  }

  // Handle generic single-column matching if defined
  if (matchColIdx !== -1 && matchValToFind && existingRowIndex === undefined) {
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var values = sheet.getRange(2, matchColIdx + 1, lastRow - 1, 1).getValues();
      for (var i = 0; i < values.length; i++) {
        if (String(values[i][0]) === String(matchValToFind)) {
          existingRowIndex = i + 2;
          break;
        }
      }
    }
  }

  if (existingRowIndex && existingRowIndex !== -1) {
    var range = sheet.getRange(existingRowIndex, 1, 1, config.headers.length);
    var existingRowValues = range.getValues()[0];
    var updatedRow = [];
    for (var col = 0; col < config.headers.length; col++) {
      var newValue = row[col];
      var oldValue = existingRowValues[col];
      // Keep old timestamp if new timestamp is auto-generated or if old timestamp exists
      if (config.headers[col].toLowerCase() === "timestamp" && oldValue) {
        updatedRow.push(oldValue);
      } else if (newValue !== undefined && newValue !== null && newValue !== "") {
        updatedRow.push(newValue);
      } else {
        updatedRow.push(oldValue || "");
      }
    }
    range.setValues([updatedRow]);

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      sheet: sheetName,
      message: "Row updated successfully",
      row: updatedRow
    })).setMimeType(ContentService.MimeType.JSON);
  } else {
    sheet.appendRow(row);
  }

  // Automatic Discord Webhook Notification
  var defaultWebhook = "https://discord.com/api/webhooks/1524497859267788820/MUWTDT_2VyxfiRwbPJJ8ign2Z9OZIhBarWtCSwXOCOn68Occy3f0aEolWfNAhozM91Fi";
  var webhookUrl = PropertiesService.getScriptProperties().getProperty("DISCORD_WEBHOOK_URL") || defaultWebhook;

  if (webhookUrl) {
    try {
      var embedFields = [];
      for (var col = 0; col < config.headers.length; col++) {
        var val = row[col];
        if (val !== undefined && val !== null && val !== "") {
          embedFields.push({ name: config.headers[col], value: String(val).substring(0, 1000), inline: true });
        }
      }
      var embed = {
        embeds: [{
          title: "New " + sheetName + " Entry",
          color: 0x5F8651,
          fields: embedFields.slice(0, 25),
          footer: { text: "Logged via Google Apps Script at " + new Date().toLocaleString() }
        }]
      };
      UrlFetchApp.fetch(webhookUrl, {
        method: "post",
        contentType: "application/json",
        payload: JSON.stringify(embed),
        muteHttpExceptions: true
      });
    } catch (err) {
      // Ignore webhook error
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    sheet: sheetName,
    message: "Row appended successfully",
    row: row
  })).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  // Check for read-sheet action first
  if (e && e.parameter) {
    var action = e.parameter.action || e.parameter.Action;
    if (action === "read-sheet") {
      return handleRequest(e);
    }
    var hasSheet = e.parameter.Sheet || e.parameter.sheet || e.parameter.type;
    if (hasSheet || (e.parameter.Email || e.parameter.email)) {
      return handleRequest(e);
    }
  }
  
  // Otherwise, return API status check
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    status: "active",
    message: "LandNow Google Apps Script is active. Send POST/GET with Sheet=Newsletter|Visitors|Entries and fields to submit entries.",
    spreadsheetUrl: "https://docs.google.com/spreadsheets/d/1jYiAaAgi5FO0revNHVj-mVBzRA7ach8YzaAkaPRTjIM/edit?gid=0#gid=0",
    sheets: Object.keys(SHEET_CONFIG),
    setup: "Run setupSheets() once from the editor to create all sheets with headers."
  }))
  .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return handleRequest(e);
}

/**
 * Test runner for Google Apps Script triggers & spreadsheet operations.
 * Can be run from the Apps Script editor or invoked directly via test suites.
 */
function testTriggers() {
  var results = [];
  
  // 1. Test setupSheets
  try {
    setupSheets();
    results.push({ test: "setupSheets", status: "PASSED" });
  } catch (err) {
    results.push({ test: "setupSheets", status: "FAILED", error: String(err) });
  }
  
  // 2. Test DomainLeads contract acceptance write
  try {
    var dummyEvent = {
      postData: {
        contents: JSON.stringify({
          email: "test.founder@example.com",
          domain: "landnow.com",
          timestamp: new Date().toISOString(),
          accepted: true,
          sheet: "DomainLeads"
        })
      }
    };
    var response = handleRequest(dummyEvent);
    var content = JSON.parse(response.getContent());
    if (content.success) {
      results.push({ test: "domainLeadsWrite", status: "PASSED", response: content });
    } else {
      results.push({ test: "domainLeadsWrite", status: "FAILED", error: content.error });
    }
  } catch (err) {
    results.push({ test: "domainLeadsWrite", status: "FAILED", error: String(err) });
  }
  
  Logger.log(JSON.stringify(results, null, 2));
  return results;
}
// Sync trigger forced
