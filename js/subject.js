const _yearEl = document.getElementById('year');
if (_yearEl) _yearEl.textContent = new Date().getFullYear();

// 1. Get selected grade (default to 9 if missing)
const grade = localStorage.getItem('selectedGrade') || '9';
const gradeTitleEl = document.getElementById('grade-title');
if (gradeTitleEl) gradeTitleEl.textContent = `Grade ${grade} - Select Subject`;

// ==================================================
// 2. DEFINE SUBJECT LISTS SEPARATELY
// ==================================================

// List for the TOP Section (2017 / Model)

const SUBJECTS_2017 = {
  9:  ['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History'],
  10: ['Mathematics','Biology','Chemistry','Physics','English','Civics','Geography','History'],
  11: ['Mathematics','Biology','Chemistry','Physics','English','Economics','Geography','History','Mathematics(S.S)','English(S.S)'],
  12: ['Mathematics','Biology','Chemistry','Physics','English','Aptitude','Economics','Aptitude(S.S)','Geography','History','Mathematics(S.S)','English(S.S)']
};

// List for the BOTTOM Section (2016)
// ✅ I ADDED 'chemistry(2016)' here
const SUBJECTS_2016 = {
  9: [],
  10: [],
  11: [],
  12: ['Mathematics(2016)','Biology(2016)','Chemistry(2016)','Physics(2016)','English(2016)','Aptitude(2016)','Economics(2016)','Aptitude(S.S/2016)','Geography(2016)','History(2016)','Mathematics(S.S/2016)','English(S.S/2016)'] // Add other 2016 subjects here if needed
};

// 3. Select the Main Container
const mainSection = document.querySelector('.subjects-section');
const topGrid = document.getElementById('subjects-container');

if (!topGrid) {
    console.warn('subjects-container not found; subject cards will not be rendered.');
}

// --- HELPER FUNCTION TO CREATE CARDS ---
function createCard(subName, yearLabel) {
    const div = document.createElement('div');
    div.classList.add('subject-card');
    div.textContent = subName;
    
    // Handle Click
    div.addEventListener('click', () => {
        // Persist selections and include them in the URL for robustness
        localStorage.setItem('selectedGrade', grade);
        localStorage.setItem('selectedSubject', subName);
        localStorage.setItem('selectedYear', yearLabel);
        const params = new URLSearchParams({ grade: grade, subject: subName });
        window.location.href = `quiz.html?${params.toString()}`;
    });
    return div;
}

// ==================================================
// 4. RENDER TOP GRID (2017 / Model)
// ==================================================
const list2017 = SUBJECTS_2017[grade] || [];
if (topGrid) {
    topGrid.innerHTML = ''; 
    if (list2017.length > 0) {
        list2017.forEach(sub => topGrid.appendChild(createCard(sub, 'Model')));
    } else {
        topGrid.innerHTML = '<p style="color:white;">No subjects available.</p>';
    }
}

// ==================================================
// 5. RENDER BOTTOM GRID (2016)
// ==================================================
const list2016 = SUBJECTS_2016[grade] || [];

// Only create the 2016 section if there are subjects for this grade
if (list2016.length > 0 && mainSection) {
    
    // A. Create the "2016" Divider Title
    const divider = document.createElement('h2'); 
    divider.className = 'year-section-title';
    divider.textContent = '2016';
    // Add style to match the top title
    divider.style.cssText = "color: #FFC727; font-size: 2.5rem; font-weight: 800; margin-top: 60px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); text-align: center;";
    
    mainSection.appendChild(divider);

    // B. Create the Bottom Grid Container
    const bottomGrid = document.createElement('div');
    bottomGrid.className = 'subjects-grid'; // Use same CSS class as top grid
    
    // C. Fill Bottom Grid with 2016 Cards
    list2016.forEach(sub => {
        bottomGrid.appendChild(createCard(sub, '2016'));
    });

    mainSection.appendChild(bottomGrid);
}
else if (list2016.length > 0 && !mainSection) {
    console.warn('Main subjects section missing; cannot render 2016 grid.');
}
