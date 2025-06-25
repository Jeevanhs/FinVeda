// Main application initialization and navigation
const app = {
    init: function() {
        this.initNavigation();
        this.initMobileNav();
        dashboard.init();
        charts.initializeCharts();
        income.init();
        expenses.init();
        savings.init();
        resources.init();
        
        // Show dashboard by default
        this.showSection('dashboard');
    },

    initNavigation: function() {
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.showSection(e.target.id.replace('Btn', ''));
                if (window.innerWidth <= 768) {
                    document.querySelector('.navbar').classList.remove('active');
                }
            });
        });

        // Language selector
        const languageSelect = document.getElementById('languageSelect');
        languageSelect.addEventListener('change', (e) => {
            translator.setLanguage(e.target.value);
        });
    },

    initMobileNav: function() {
        const navToggle = document.getElementById('navToggle');
        const navbar = document.querySelector('.navbar');

        navToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && 
                !navbar.contains(e.target) && 
                !navToggle.contains(e.target)) {
                navbar.classList.remove('active');
            }
        });
    },

    showSection: function(sectionId) {
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(sectionId).classList.add('active');
        document.getElementById(`${sectionId}Btn`).classList.add('active');
    }
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    try {
        app.init();
    } catch (error) {
        console.error('Error initializing application:', error);
    }
});