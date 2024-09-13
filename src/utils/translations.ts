document.addEventListener('DOMContentLoaded', async () => {
  const getTranslationsUrl = (lang) => `/src/locales/${lang}.json`;

  const applyTranslations = (translations) => {
    document.querySelectorAll('[data-translate]').forEach(el => {
      const key = el.getAttribute('data-translate');
      const translation = translations.menu[key] || key;  // Assuming you want to apply menu translations
      el.textContent = translation;
    });
  };

  // Load and apply translations based on stored or default language
  const storedLanguage = localStorage.getItem('selectedLanguage') || 'en';
  const response = await fetch(getTranslationsUrl(storedLanguage));
  const translations = await response.json();
  applyTranslations(translations);

  // Handle language change
  document.querySelector('.language-selector').addEventListener('change', async (event) => {
    const selectedLanguage = event.target.value;
    localStorage.setItem('selectedLanguage', selectedLanguage);
    const newResponse = await fetch(getTranslationsUrl(selectedLanguage));
    const newTranslations = await newResponse.json();
    applyTranslations(newTranslations);
  });
});
