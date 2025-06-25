// Utility functions for common operations
const utils = {
    formatCurrency: (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    },

    formatDate: (date) => {
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    calculateProgress: (current, target) => {
        return Math.min(Math.round((current / target) * 100), 100);
    },

    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    showNotification: (message, type = 'success') => {
        // Implementation for showing notifications
        console.log(`${type}: ${message}`);
    }
};