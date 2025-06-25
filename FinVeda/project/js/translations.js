// Translations for multilingual support
const translations = {
    en: {
        dashboard: {
            title: 'Dashboard',
            totalBalance: 'Total Balance',
            monthlySavings: 'Monthly Savings',
            totalExpenses: 'Total Expenses',
            expenseBreakdown: 'Expense Breakdown',
            savingsGoals: 'Savings Goals'
        },
        expenses: {
            title: 'Expenses',
            addNew: 'Add New Expense',
            amount: 'Amount',
            category: 'Category',
            date: 'Date',
            notes: 'Notes',
            categories: {
                food: 'Food',
                transportation: 'Transportation',
                utilities: 'Utilities',
                healthcare: 'Healthcare',
                education: 'Education',
                others: 'Others'
            }
        },
        savings: {
            title: 'Savings Goals',
            createNew: 'Create New Goal',
            goalName: 'Goal Name',
            targetAmount: 'Target Amount',
            targetDate: 'Target Date',
            progress: 'Progress'
        },
        resources: {
            title: 'Resources',
            articles: 'Financial Education',
            calculators: 'Financial Calculators'
        },
        common: {
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            success: 'Success',
            error: 'Error'
        }
    },
    hi: {
        dashboard: {
            title: 'डैशबोर्ड',
            totalBalance: 'कुल बैलेंस',
            monthlySavings: 'मासिक बचत',
            totalExpenses: 'कुल खर्च',
            expenseBreakdown: 'खर्च का विवरण',
            savingsGoals: 'बचत लक्ष्य'
        },
        // Add more Hindi translations
    },
    es: {
        dashboard: {
            title: 'Panel de Control',
            totalBalance: 'Balance Total',
            monthlySavings: 'Ahorros Mensuales',
            totalExpenses: 'Gastos Totales',
            expenseBreakdown: 'Desglose de Gastos',
            savingsGoals: 'Objetivos de Ahorro'
        },
        // Add more Spanish translations
    }
};

let currentLanguage = 'en';

const translator = {
    setLanguage: (lang) => {
        if (translations[lang]) {
            currentLanguage = lang;
            translator.updatePageTranslations();
        }
    },

    getText: (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];
        for (const k of keys) {
            value = value?.[k];
        }
        return value || key;
    },

    updatePageTranslations: () => {
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            element.textContent = translator.getText(key);
        });
    }
};