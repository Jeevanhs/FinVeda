// Local storage management
const storage = {
    keys: {
        EXPENSES: 'ruralFinance_expenses',
        SAVINGS_GOALS: 'ruralFinance_savings_goals',
        INCOME: 'ruralFinance_income',
        SETTINGS: 'ruralFinance_settings'
    },

    getItem: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    setItem: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error writing to localStorage:', error);
            return false;
        }
    },

    // Income methods
    getIncome: () => {
        return storage.getItem(storage.keys.INCOME) || [];
    },

    addIncome: (income) => {
        const incomeList = storage.getIncome();
        incomeList.push({ ...income, id: utils.generateId() });
        return storage.setItem(storage.keys.INCOME, incomeList);
    },

    updateIncome: (id, updatedIncome) => {
        const incomeList = storage.getIncome();
        const index = incomeList.findIndex(inc => inc.id === id);
        if (index !== -1) {
            incomeList[index] = { ...updatedIncome, id };
            return storage.setItem(storage.keys.INCOME, incomeList);
        }
        return false;
    },

    deleteIncome: (id) => {
        const incomeList = storage.getIncome();
        const filteredIncome = incomeList.filter(inc => inc.id !== id);
        return storage.setItem(storage.keys.INCOME, filteredIncome);
    },

    // Existing methods
    getExpenses: () => {
        return storage.getItem(storage.keys.EXPENSES) || [];
    },

    addExpense: (expense) => {
        const expenses = storage.getExpenses();
        expenses.push({ ...expense, id: utils.generateId() });
        return storage.setItem(storage.keys.EXPENSES, expenses);
    },

    updateExpense: (id, updatedExpense) => {
        const expenses = storage.getExpenses();
        const index = expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
            expenses[index] = { ...updatedExpense, id };
            return storage.setItem(storage.keys.EXPENSES, expenses);
        }
        return false;
    },

    deleteExpense: (id) => {
        const expenses = storage.getExpenses();
        const filteredExpenses = expenses.filter(exp => exp.id !== id);
        return storage.setItem(storage.keys.EXPENSES, filteredExpenses);
    },

    getSavingsGoals: () => {
        return storage.getItem(storage.keys.SAVINGS_GOALS) || [];
    },

    addSavingsGoal: (goal) => {
        const goals = storage.getSavingsGoals();
        goals.push({ ...goal, id: utils.generateId(), currentAmount: 0 });
        return storage.setItem(storage.keys.SAVINGS_GOALS, goals);
    },

    updateSavingsGoal: (id, updatedGoal) => {
        const goals = storage.getSavingsGoals();
        const index = goals.findIndex(goal => goal.id === id);
        if (index !== -1) {
            goals[index] = { ...updatedGoal, id };
            return storage.setItem(storage.keys.SAVINGS_GOALS, goals);
        }
        return false;
    },

    deleteSavingsGoal: (id) => {
        const goals = storage.getSavingsGoals();
        const filteredGoals = goals.filter(goal => goal.id !== id);
        return storage.setItem(storage.keys.SAVINGS_GOALS, filteredGoals);
    }
};