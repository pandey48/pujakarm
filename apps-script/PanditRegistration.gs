function savePanditRegistration_(data, spreadsheet) {
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
  if (!spreadsheet || typeof spreadsheet.getSheetByName !== "function") {
    throw new Error("A spreadsheet is required to save the Pandit registration.");
  }

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    let sheet = spreadsheet.getSheetByName("Pandits");
    if (!sheet) {
      sheet = spreadsheet.insertSheet("Pandits");
    }

    let currentHeaders;
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      currentHeaders = headers.slice();
    } else {
      const lastColumn = Math.max(sheet.getLastColumn(), 1);
      currentHeaders = sheet.getRange(1, 1, 1, lastColumn).getDisplayValues()[0].map(function (header) {
        return header.trim();
      });
      const missingHeaders = headers.filter(function (header) {
        return currentHeaders.indexOf(header) === -1;
      });
      if (missingHeaders.length) {
        sheet.getRange(1, currentHeaders.length + 1, 1, missingHeaders.length).setValues([missingHeaders]);
        currentHeaders = currentHeaders.concat(missingHeaders);
      }
    }

    const fieldByHeader = {
      "Pandit Name": "name",
      "Mobile Number": "phone",
      "WhatsApp Number": "whatsapp",
      City: "city",
      State: "state",
      Language: "language",
      "Puja/Services": "services",
      Experience: "experience",
    };
    sheet.appendRow(currentHeaders.map(function (header) {
      const field = fieldByHeader[header];
      return field ? data[field].trim() : "";
    }));
    return { success: true, type: "pandit" };
  } finally {
    lock.releaseLock();
  }
}