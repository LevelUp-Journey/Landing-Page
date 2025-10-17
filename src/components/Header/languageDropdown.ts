// Language dropdown functionality

export function initLanguageDropdown() {
  // Initialize language on load
  if (!localStorage.getItem('language')) {
    localStorage.setItem('language', 'en');
  }

  const toggle = document.getElementById('language-toggle');
  const dropdown = document.getElementById('language-dropdown');
  const options = document.querySelectorAll('.language-option');
  const currentLang = localStorage.getItem('language') || 'en';

  // Toggle dropdown
  toggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown?.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdown?.classList.remove('active');
  });

  // Language selection
  options.forEach((option) => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = option.getAttribute('data-lang');
      if (lang && lang !== currentLang) {
        localStorage.setItem('language', lang);
        window.location.reload();
      }
    });
  });
}
