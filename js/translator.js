const translations = {
  am: { login: "ግባ" },
  or: { login: "Seeni" }
};

document.getElementById("languageSwitcher")?.addEventListener("change", (e) => {
  const lang = e.target.value;
  document.querySelectorAll("[data-translate]").forEach(el => {
    const key = el.getAttribute("data-translate");
    if (translations[lang] && translations[lang][key]) {
      el.innerText = translations[lang][key];
    }
  });
});