function savePanditRegistration_(data) {
  const headers = [
    "Pandit Name",
    "Mobile Number",
    "WhatsApp Number",
    "City",
    "State",
    "Language",
    "Puja/Services",
    "Experience",
  ];
  const fields = ["name", "phone", "whatsapp", "city", "state", "language", "services", "experience"];
  const mobilePattern = /^(?:\+?91[ -]?)?[6-9]\d{9}$/;

  if (!data || data.type !== "pandit" || fields.some(function (field) {
    return typeof data[field] !== "string" || !data[field].trim();
  })) {
    throw new Error("All Pandit registration fields are required.");
  }
  if (!mobilePattern.test(data.phone.trim()) || !mobilePattern.test(data.whatsapp.trim())) {
    throw new Error("Enter valid Indian mobile numbers.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("This Apps Script must be bound to the PujaPath spreadsheet.");
    }

    let sheet = spreadsheet.getSheetByName("Pandits");
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Pandits");
    }

    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    } else {
      if (sheet.getLastColumn() > headers.length) {
        throw new Error('The "Pandits" sheet has unexpected extra columns.');
      }
      const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getDisplayValues()[0];
      if (headers.some(function (header, index) {
        return currentHeaders[index].trim() !== header;
      })) {
        throw new Error('The "Pandits" sheet header does not match the required column order.');
      }
    }

    sheet.appendRow(fields.map(function (field) {
      return data[field].trim();
    }));
    return { success: true, type: "pandit" };
  } finally {
    lock.releaseLock();
  }
}