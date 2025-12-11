const fs = require('fs');

let jsContent = fs.readFileSync('quiz.js', 'utf-8');

// Extract everything between the first [ and the last ] (your array)
let arrayContent = jsContent.match(/\[([\s\S]*)\]/)[0];

// Replace unquoted keys with quoted keys
let jsonContent = arrayContent.replace(/(\w+):/g, '"$1":');

// Remove trailing commas before } or ]
jsonContent = jsonContent.replace(/,(\s*[\}\]])/g, '$1');

// Wrap in [ ] if not already
if (!jsonContent.trim().startsWith('[')) {
  jsonContent = '[' + jsonContent + ']';
}

fs.writeFileSync('questions.json', jsonContent);
console.log('✅ questions.json created!');
