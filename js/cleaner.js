const fs = require('fs');

// 1. Read the file that has the red errors
const fileName = 'questions_fixed_final.json'; 
let lines = fs.readFileSync(fileName, 'utf8').split('\n');

console.log(`🔍 Scanning ${lines.length} lines for broken quotes...`);

let fixedLines = lines.map(line => {
    // Check if line looks like:  "key": "some text value",
    // We strictly look for the pattern: whitespace "key" : "value"
    const match = line.match(/^(\s*"[a-zA-Z0-9_]+"\s*:\s*")(.+)(",?)$/);

    if (match) {
        let prefix = match[1]; // The "key": " part
        let content = match[2]; // The text inside
        let suffix = match[3]; // The closing ", part

        // FIX 1: Escape any double quotes inside the content
        // We replace " with \"
        let cleanContent = content.replace(/"/g, '\\"');

        // FIX 2: Remove accidental double escapes if they happened (e.g. \\")
        cleanContent = cleanContent.replace(/\\\\"/g, '\\"');
        
        // FIX 3: Fix the specific "is": pattern seen in your screenshot
        // If it sees \"is\": at the end, just make it is: (looks cleaner)
        cleanContent = cleanContent.replace(/ \\"is\\":/g, ' is:');

        // Rebuild the line
        return prefix + cleanContent + suffix;
    }
    
    // If line is just brackets { } [ ] or numbers, leave it alone
    return line;
});

// 2. Save the Clean File
fs.writeFileSync('questions_ready.json', fixedLines.join('\n'));
console.log("✅ FIXED! Created 'questions_ready.json'.");
console.log("👉 Open that file and the red errors should be gone.");