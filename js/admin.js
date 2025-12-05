// =======================
// DonBoscoPrep Admin Panel (FINAL FIXED VERSION)
// Saves everything into "quizQuestions"
// =======================

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// DOM elements
const uploadedPapersList = document.getElementById('uploaded-papers');
const uploadedQuestionsList = document.getElementById('uploaded-questions');

// Load questions from localStorage (main key used by quiz.js)
let questions = JSON.parse(localStorage.getItem('quizQuestions')) || [];

/* --------------------------------------------------
   PDF Upload (Still simulated — no server upload)
-------------------------------------------------- */
document.getElementById('upload-btn').addEventListener('click', () => {
  const grade = document.getElementById('grade-select').value;
  const subject = document.getElementById('subject-select').value;
  const year = document.getElementById('year-input').value;
  const pdf = document.getElementById('pdf-upload').files[0];

  if (!pdf || !year) {
    alert("Please select a PDF and enter year");
    return;
  }

  const li = document.createElement('li');
  li.textContent = `Grade ${grade} – ${subject} – ${year} – ${pdf.name}`;
  uploadedPapersList.appendChild(li);

  document.getElementById('pdf-upload').value = "";
  document.getElementById('year-input').value = "";
});


/* --------------------------------------------------
   MULTIPLE CHOICE QUESTION SYSTEM (WORKING)
-------------------------------------------------- */

// Render question list
function renderQuestions() {
  if (questions.length === 0) {
    uploadedQuestionsList.innerHTML = "<li>No questions added yet.</li>";
    return;
  }

  uploadedQuestionsList.innerHTML = questions.map((q, i) => `
    <li>
      <strong>Grade ${q.grade} - ${q.subject}</strong>: ${q.question}
      <br>Correct: <b>${q.options[q.correct]}</b>
      <br><button onclick="deleteQuestion(${i})">Delete</button>
    </li>
  `).join("");
}

// Delete question
function deleteQuestion(index) {
  if (!confirm("Delete this question?")) return;

  questions.splice(index, 1);
  localStorage.setItem('quizQuestions', JSON.stringify(questions));
  renderQuestions();
}

// Add MCQ
document.getElementById('add-question-btn').addEventListener('click', () => {
  const grade = parseInt(document.getElementById('mc-grade').value);
  const subject = document.getElementById('mc-subject').value;
  const question = document.getElementById('mc-question').value.trim();
  const options = document.getElementById('mc-options').value.split(',').map(o => o.trim());
  const correct = parseInt(document.getElementById('mc-answer').value);
  const explanation = document.getElementById('mc-explanation').value.trim();

  if (!question || options.length !== 4 || isNaN(correct) || !explanation) {
    alert("Please fill all fields and enter 4 options");
    return;
  }

  const newQuestion = {
    grade,
    subject,
    question,
    options,
    correct,
    aiExplanation: explanation
  };

  questions.push(newQuestion);
  localStorage.setItem('quizQuestions', JSON.stringify(questions));

  renderQuestions();

  // Clear fields
  document.getElementById('mc-question').value = "";
  document.getElementById('mc-options').value = "";
  document.getElementById('mc-answer').value = "";
  document.getElementById('mc-explanation').value = "";

  alert("Question added successfully!");
});

// First render
renderQuestions();

// Expose delete function globally
window.deleteQuestion = deleteQuestion;
