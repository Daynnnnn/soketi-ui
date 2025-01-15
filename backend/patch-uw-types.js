const fs = require("fs");
const path = require("path");

const definitionFilePath = path.join(
  __dirname,
  "node_modules",
  "uWebSockets.js",
  "index.d.ts"
);

fs.readFile(definitionFilePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  // This regex tries to match the whole WebSocket interface block
  const interfaceRegex = /export interface WebSocket<UserData> {[\s\S]*?}/gm;
  const match = data.match(interfaceRegex);

  if (match) {
    // Check if the custom line is already there
    if (!match[0].includes("[key: string]: any;")) {
      // Insert our custom line before the closing brace of the interface
      const modifiedInterface = match[0].replace(
        /}\s*$/,
        "    [key: string]: any;\n}"
      );

      // Replace the old interface block with our modified one in the file's content
      const modifiedData = data.replace(interfaceRegex, modifiedInterface);

      fs.writeFile(definitionFilePath, modifiedData, "utf8", (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
        } else {
          console.log("File successfully updated.");
        }
      });
    } else {
      console.log("Custom line already present in the WebSocket interface.");
    }
  } else {
    console.log("WebSocket interface definition not found.");
  }
});
