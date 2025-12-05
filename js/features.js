/* ================================
   FLASHCARDS
================================ */
function renderFlashcards(flashcardData = []) {
  const container = document.getElementById("flashcards-container");
  if (!container) return;

  container.innerHTML = "";

  flashcardData.forEach(card => {
    const cardEl = document.createElement("div");
    cardEl.className = "flashcard";
    cardEl.innerHTML = `
      <div class="flashcard-inner">
        <div class="flashcard-front">${card.question}</div>
        <div class="flashcard-back">${card.answer}</div>
      </div>
    `;
    container.appendChild(cardEl);

    cardEl.addEventListener("click", () => {
      cardEl.classList.toggle("flip");
    });
  });
}


/* ================================
   DAILY CHALLENGE
================================ */
const DAILY_CHALLENGE_KEY = "dailyChallengeData";
const DAILY_CHALLENGE_DATE_KEY = "dailyChallengeDate";

function generateDailyChallenge() {
  return {
    question: "What is 12 × 7?",
    options: ["72", "78", "84", "96"],
    answer: "84"
  };
}

function saveDailyChallenge(challenge) {
  localStorage.setItem(DAILY_CHALLENGE_KEY, JSON.stringify(challenge));
  localStorage.setItem(DAILY_CHALLENGE_DATE_KEY, new Date().toDateString());
}

function loadDailyChallenge() {
  const savedDate = localStorage.getItem(DAILY_CHALLENGE_DATE_KEY);
  const today = new Date().toDateString();

  if (savedDate !== today) {
    const newChallenge = generateDailyChallenge();
    saveDailyChallenge(newChallenge);
    return newChallenge;
  }

  return JSON.parse(localStorage.getItem(DAILY_CHALLENGE_KEY));
}

function renderDailyChallenge() {
  const section = document.getElementById("daily-challenge-section");
  if (!section) return;

  const challenge = loadDailyChallenge();

  section.innerHTML = `
    <h3>🔥 Daily Challenge</h3>
    <p>${challenge.question}</p>
    <div id="challenge-options">
      ${challenge.options
        .map(
          opt => `<button class="challenge-btn" data-opt="${opt}">${opt}</button>`
        )
        .join("")}
    </div>
    <p id="challenge-result"></p>
  `;

  section.style.display = "block";

  document.querySelectorAll(".challenge-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const result = document.getElementById("challenge-result");
      if (btn.dataset.opt === challenge.answer) {
        result.textContent = "Correct! 🎉";
        result.style.color = "limegreen";
      } else {
        result.textContent = "Incorrect. Try again tomorrow!";
        result.style.color = "red";
      }
    });
  });
}


/* ================================
   WEAK TOPIC SUGGESTION
================================ */
function getWeakTopics(history = []) {
  if (!history.length) return [];

  const counts = {};
  history.forEach(q => {
    if (!counts[q.topic]) counts[q.topic] = { wrong: 0, total: 0 };
    counts[q.topic].total++;
    if (!q.correct) counts[q.topic].wrong++;
  });

  return Object.entries(counts)
    .map(([topic, data]) => ({
      topic,
      weakness: (data.wrong / data.total) * 100
    }))
    .sort((a, b) => b.weakness - a.weakness)
    .slice(0, 3);
}

function renderWeakTopics(weakTopics) {
  const container = document.getElementById("weak-topics");
  if (!container) return;

  if (!weakTopics.length) {
    container.innerHTML = "<p>No data yet. Keep practicing!</p>";
    return;
  }

  container.innerHTML = weakTopics
    .map(
      w =>
        `<div class="weak-topic-item">
          <strong>${w.topic}</strong> — Weakness: ${w.weakness.toFixed(1)}%
        </div>`
    )
    .join("");
}


/* ================================
   TRY SIMILAR QUESTION
================================ */
function getSimilarQuestion(currentTopic) {
  return {
    question: `Another question from ${currentTopic}?`,
    answer: "Example Answer"
  };
}

function showSimilarQuestion(topic) {
  const box = document.getElementById("similar-question-box");
  if (!box) return;

  const q = getSimilarQuestion(topic);

  box.innerHTML = `
    <h4>Try Similar Question</h4>
    <p>${q.question}</p>
  `;
}


/* ================================
   SHARE SCORE (for social links)
================================ */
function shareScore(score) {
  const text = encodeURIComponent(`I scored ${score}% on today's practice!`);
  const url = encodeURIComponent(window.location.href);

  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
    "_blank"
  );
}


/* ================================
   AUTO-INITIALIZE ON HOMEPAGE
================================ */
document.addEventListener("DOMContentLoaded", () => {
  console.log("features.js loaded successfully!");

  // Load daily challenge
  if (document.getElementById("daily-challenge-section")) {
    renderDailyChallenge();
  }

  // Load weak topics if data exists
  const history = JSON.parse(localStorage.getItem("questionHistory") || "[]");
  renderWeakTopics(getWeakTopics(history));
});
