const ThemeManager = () => {
  const themeToggle = document.querySelector('#theme-toggle');
  const body = document.querySelector('body');
  const nav = document.querySelector('nav');

  // Check the user's preference from local storage
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    nav.classList.add('bg-dark');
    nav.classList.add('navbar-dark');
    nav.classList.add('navbar-custom');
    nav.style.setProperty('--bs-navbar-color', 'white');

  }

  // Toggle the theme when the button is clicked
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    nav.classList.toggle('bg-dark', document.body.classList.contains('dark-mode'));


    // Save the user's preference to local storage
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
  });
};

export default ThemeManager;
