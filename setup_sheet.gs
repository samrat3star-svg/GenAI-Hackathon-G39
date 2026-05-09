function setupCineVaultDB() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheets()[0];

  // Rename sheet tab
  sheet.setName("Users");

  // Set column headers
  const headers = ["id", "email", "password", "name", "archetype", "watchlist", "collections", "createdAt"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Style header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#1a1a2e");
  headerRange.setFontColor("#ffffff");
  headerRange.setFontSize(11);

  // Freeze header row
  sheet.setFrozenRows(1);

  // Set column widths
  sheet.setColumnWidth(1, 200); // id
  sheet.setColumnWidth(2, 200); // email
  sheet.setColumnWidth(3, 150); // password
  sheet.setColumnWidth(4, 150); // name
  sheet.setColumnWidth(5, 130); // archetype
  sheet.setColumnWidth(6, 300); // watchlist (JSON)
  sheet.setColumnWidth(7, 300); // collections (JSON)
  sheet.setColumnWidth(8, 180); // createdAt

  // Rename spreadsheet
  ss.rename("CineVault G39 Database");

  // Log the spreadsheet ID
  const id = ss.getId();
  Logger.log("✅ Sheet setup complete!");
  Logger.log("📋 Spreadsheet ID: " + id);
  Logger.log("🔗 URL: " + ss.getUrl());

  // Show a popup with the ID
  SpreadsheetApp.getUi().alert(
    "✅ CineVault G39 Database Ready!\n\n" +
    "Spreadsheet ID:\n" + id + "\n\n" +
    "Copy this ID and give it to Claude."
  );
}
