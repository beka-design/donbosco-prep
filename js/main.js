// =======================
// Set current year in footer
// =======================
document.getElementById('year').textContent = new Date().getFullYear();


// =======================
// SPA Router & Page Render
// =======================
const view = document.getElementById('view');

const GRADES = [9,10,11,12];
const SUBJECTS = {
  9:['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History','IT','PE'],
  10:['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History','IT','PE'],
  11:['Mathematics','Biology','Chemistry','Physics','English','Civics','Economics','Geography','History'],
  12:['Mathematics','Biology','Chemistry','Physics','English','Civics','Economics','Geography','History']
};

// ===== Router helper =====
function router(path){
  location.hash = path;
}

// ===== Subject Selection =====
function selectSubject(grade, subject){
  localStorage.setItem('selectedGrade', grade);
  localStorage.setItem('selectedSubject', subject);
  router('/quiz');
}

// ===== Render Pages with Fade-In Animation =====
function render(path){
  path = path || '/';
  let content = '';

  if(path === '/' || path === ''){
    content = `
      <section class="card">
        <h1>Welcome to DonBoscoPrep</h1>
        <p>Practice past papers and mock exams for Grades 9–12.</p>
        <div class="grades-grid">
          ${GRADES.map(g=>`<div class="grade-card" onclick='router("/grade/${g}")'>Grade ${g}</div>`).join('')}
        </div>
      </section>
    `;
  } 
  else if(path.startsWith('/grade/')){
    const gradeNum = parseInt(path.split('/')[2]);
    const subjects = SUBJECTS[gradeNum] || [];
    content = `
      <section class="card">
        <h2>Grade ${gradeNum} - Select Subject</h2>
        <div class="subjects-grid">
          ${subjects.map(s=>`<div class="subject-card" onclick='selectSubject(${gradeNum},"${s}")'>${s}</div>`).join('')}
        </div>
      </section>
    `;
  } 
  else if(path === '/quiz'){
    content = `
      <section class="card">
        <h2>Grade ${localStorage.getItem('selectedGrade')} - ${localStorage.getItem('selectedSubject')} Quiz</h2>
        <div class="quiz-container" id="quiz-container"></div>
      </section>
    `;
  } 
  else {
    content = `<section class="card"><h2>Page Not Found</h2></section>`;
  }

  // Inject content wrapped in .page
  view.innerHTML = `<div class="page">${content}</div>`;

  // Trigger fade-in animation
  const pageDiv = view.querySelector('.page');
  requestAnimationFrame(()=> pageDiv.classList.add('active'));

  // If quiz page, initialize quiz.js
  if(path === '/quiz' && typeof initQuiz === 'function'){
    initQuiz();
  }
}

// ===== Listen to hash changes =====
window.onhashchange = ()=> render(location.hash.slice(1));

// ===== Initialize SPA =====

/* ========== Typing Animation ========== */
document.addEventListener("DOMContentLoaded", () => {
  const typedText = [
    "Trusted by Ethiopian Students.",
    "Past Papers for Grades 9–12.",
    "Study Smarter, Not Harder.",
    "Boost Your Exam Confidence."
  ];

  let index = 0;
  let charIndex = 0;
  let typingSpeed = 60;
  let erasingSpeed = 35;
  let delayBetweenTexts = 1200;

  const typedElement = document.getElementById("typed");

  function type() {
    if (charIndex < typedText[index].length) {
      typedElement.textContent += typedText[index].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetweenTexts);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedElement.textContent = typedText[index].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      index = (index + 1) % typedText.length;
      setTimeout(type, 400);
    }
  }

  type();
});
const hero = document.querySelector('.hero');

// List your downloaded images here (relative path to project folder)
const images = [
  'assets/images/hero1.jpg',
  'assets/images/hero2.jpg',
  'assets/images/hero3.jpg',
  'assets/images/hero4.jpg',
  'assets/images/hero5.jpg'
];

let current = 0;

function changeBackground() {
  hero.style.backgroundImage = `url('${images[current]}')`;
  current = (current + 1) % images.length;
}

// Initial background
changeBackground();

// Change every 5 seconds
setInterval(changeBackground, 5000);

render(location.hash.slice(1));