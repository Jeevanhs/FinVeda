// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        toggleButton.classList.add('dark');
        toggleButton.textContent = '🌞';
    }

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        toggleButton.classList.toggle('dark');

        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = '🌞';
            localStorage.setItem('theme', 'dark');
        } else {
            toggleButton.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });
});