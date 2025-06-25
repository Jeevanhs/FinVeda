// Dashboard functionality
const dashboard = {
    init: function() {
        this.updateSummary();
        this.setupEventListeners();
    },

    setupEventListeners: function() {
        // Listen for changes in income and expenses
        document.addEventListener('financeUpdate', () => {
            this.updateSummary();
            charts.updateFinanceChart();
        });
    },

    updateSummary: function() {
        const income = storage.getIncome();
        const expenses = storage.getExpenses();
        const goals = storage.getSavingsGoals();

        const totalIncome = income.reduce((sum, inc) => sum + inc.amount, 0);
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const totalSavings = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
        
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        
        const monthlyIncome = income
            .filter(inc => {
                const date = new Date(inc.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, inc) => sum + inc.amount, 0);

        const monthlyExpenses = expenses
            .filter(exp => {
                const date = new Date(exp.date);
                return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
            })
            .reduce((sum, exp) => sum + exp.amount, 0);

        document.getElementById('totalIncome').textContent = utils.formatCurrency(totalIncome);
        document.getElementById('totalBalance').textContent = utils.formatCurrency(totalIncome - totalExpenses);
        document.getElementById('monthlySavings').textContent = utils.formatCurrency(monthlyIncome - monthlyExpenses);
        document.getElementById('totalExpenses').textContent = utils.formatCurrency(totalExpenses);

        // Update goals list in dashboard
        this.updateGoalsList();
    },

    updateGoalsList: function() {
        const goalsList = document.getElementById('goalsList');
        const goals = storage.getSavingsGoals();

        goalsList.innerHTML = goals
            .sort((a, b) => {
                const aProgress = (a.currentAmount / a.targetAmount) * 100;
                const bProgress = (b.currentAmount / b.targetAmount) * 100;
                return bProgress - aProgress;
            })
            .map(goal => {
                const progress = utils.calculateProgress(goal.currentAmount, goal.targetAmount);
                return `
                    <div class="goal-item">
                        <h3>${goal.name}</h3>
                        <div class="goal-details">
                            <div class="goal-progress">
                                <div class="progress-bar" style="width: ${progress}%"></div>
                            </div>
                            <div class="goal-stats">
                                <span class="current">${utils.formatCurrency(goal.currentAmount)}</span>
                                <span class="target">/ ${utils.formatCurrency(goal.targetAmount)}</span>
                            </div>
                        </div>
                        <div class="goal-date">Target: ${utils.formatDate(goal.targetDate)}</div>
                    </div>
                `;
            })
            .join('');
    }
};