document.getElementById('year').textContent = new Date().getFullYear();

const GRADES = [9,10,11,12];
const SUBJECTS = {
  9:['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History','IT','PE'],
  10:['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History','IT','PE'],
  11:['Mathematics','Biology','Chemistry','Physics','English','Economics','Economics','Geography','History'],
  12:['Mathematics','Biology','Chemistry','Physics','English','Economics','Economics','Geography','History']
};

// Inject grades into the grid
const gradesContainer = document.getElementById('grades-container');
GRADES.forEach(grade => {
  const div = document.createElement('div');
  div.classList.add('grade-card');
  div.dataset.grade = grade;
  div.innerHTML = `<div class="sub-icon">G${grade}</div><div>Grade ${grade}</div>`;
  gradesContainer.appendChild(div);
});

// Handle click on grade to navigate to subject page
gradesContainer.addEventListener('click', (e) => {
  const gradeCard = e.target.closest('.grade-card');
  if(!gradeCard) return;
  const gradeNum = gradeCard.dataset.grade;
  // Save selected grade in localStorage to use in subject page
  localStorage.setItem('selectedGrade', gradeNum);
  window.location.href = 'subject.html';
});
