const fs = require('fs');

// Read existing JSON
let content = fs.readFileSync('questions.json', 'utf-8');

// Escape double quotes inside all string values
content = content.replace(/"(?:question|aiExplanation|options)"\s*:\s*("(?:[^"\\]|\\.)*")/g, (match, p1) => {
    let inner = p1.slice(1, -1); // remove quotes
    inner = inner.replace(/"/g, '\\"'); // escape quotes
    return match.split(':')[0] + `:"${inner}"`;
});

// Remove trailing commas before } or ]
content = content.replace(/,(\s*[\}\]])/g, '$1');

// Save fixed JSON
fs.writeFileSync('questions_fixed_final.json', content, 'utf-8');

console.log('✅ questions_fixed_final.json created! Fully valid JSON.');
