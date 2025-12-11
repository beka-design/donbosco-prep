const fs = require('fs');
const path = require('path');

// 1. READ: Look for quiz.js in the SAME folder as this script
const jsFilePath = path.join(__dirname, 'quiz.js');

// 2. WRITE: Go up one level (..) to root, then into 'api' folder
const outputDir = path.join(__dirname, '../api');
const outputFile = path.join(outputDir, 'questions.json');

console.log(`🔍 Looking for quiz file at: ${jsFilePath}`);

try {
    if (!fs.existsSync(jsFilePath)) {
        throw new Error("File not found! Make sure extract.js and quiz.js are in the same folder.");
    }

    // Read the JS file
    let jsContent = fs.readFileSync(jsFilePath, 'utf8');

    // Extract the array using Regex
    const match = jsContent.match(/(?:const|var|let)\s+\w+\s*=\s*(\[[\s\S]*?\]);/);

    if (match && match[1]) {
        // Evaluate the array string safely
        const questionsArray = new Function("return " + match[1])();

        // Convert to JSON
        const jsonContent = JSON.stringify(questionsArray, null, 2);

        // Ensure api folder exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Write file
        fs.writeFileSync(outputFile, jsonContent);
        
        console.log("✅ SUCCESS! Extracted " + questionsArray.length + " questions.");
        console.log(`👉 Your perfect file is here: ${outputFile}`);
    } else {
        console.log("❌ Could not find the array. Make sure quiz.js has 'const allQuestions = [...]'");
    }

} catch (error) {
    console.error("❌ Error:", error.message);
}