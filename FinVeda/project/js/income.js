// Income management functionality
const income = {
    init: function() {
        const incomeForm = document.getElementById('incomeForm');
        incomeForm.addEventListener('submit', income.handleIncomeSubmit);
        income.renderIncomeList();
    },

    handleIncomeSubmit: function(event) {
        event.preventDefault();

        const incomeEntry = {
            amount: parseFloat(document.getElementById('incomeAmount').value),
            source: document.getElementById('incomeSource').value,
            date: document.getElementById('incomeDate').value,
            notes: document.getElementById('incomeNotes').value,
            timestamp: Date.now()
        };

        if (storage.addIncome(incomeEntry)) {
            utils.showNotification('Income recorded successfully');
            event.target.reset();
            income.renderIncomeList();
            income.processAutomaticSavings(incomeEntry.amount);
            dashboard.updateSummary();
        } else {
            utils.showNotification('Error recording income', 'error');
        }
    },

    processAutomaticSavings: function(incomeAmount) {
        const expenses = storage.getExpenses();
        const currentMonthExpenses = expenses.filter(exp => {
            const expDate = new Date(exp.date);
            const currentDate = new Date();
            return expDate.getMonth() === currentDate.getMonth() &&
                   expDate.getFullYear() === currentDate.getFullYear();
        });

        const totalExpenses = currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
        const remainingSavings = incomeAmount - totalExpenses;

        if (remainingSavings > 0) {
            const activeGoals = storage.getSavingsGoals().filter(goal => 
                goal.currentAmount < goal.targetAmount
            );

            if (activeGoals.length > 0) {
                // Distribute remaining savings among active goals
                const savingsPerGoal = remainingSavings / activeGoals.length;
                activeGoals.forEach(goal => {
                    const newAmount = Math.min(
                        goal.currentAmount + savingsPerGoal,
                        goal.targetAmount
                    );
                    storage.updateSavingsGoal(goal.id, { ...goal, currentAmount: newAmount });
                });
                utils.showNotification(`₹${remainingSavings.toFixed(2)} automatically allocated to savings goals`);
                savings.renderGoalsList();
            }
        }
    },

    renderIncomeList: function() {
        const incomeList = document.getElementById('incomeList');
        const incomeEntries = storage.getIncome();

        incomeList.innerHTML = incomeEntries
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(entry => `
                <div class="income-item" data-id="${entry.id}">
                    <div class="income-details">
                        <div class="income-amount">+${utils.formatCurrency(entry.amount)}</div>
                        <div class="income-source">${entry.source}</div>
                        <div class="income-date">${utils.formatDate(entry.date)}</div>
                        ${entry.notes ? `<div class="income-notes">${entry.notes}</div>` : ''}
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="income.editIncome('${entry.id}')">
                            ${translator.getText('common.edit')}
                        </button>
                        <button class="btn-delete" onclick="income.deleteIncome('${entry.id}')">
                            ${translator.getText('common.delete')}
                        </button>
                    </div>
                </div>
            `).join('');
    },

    editIncome: function(id) {
        const entry = storage.getIncome().find(inc => inc.id === id);
        if (!entry) return;

        document.getElementById('incomeAmount').value = entry.amount;
        document.getElementById('incomeSource').value = entry.source;
        document.getElementById('incomeDate').value = entry.date;
        document.getElementById('incomeNotes').value = entry.notes;

        const form = document.getElementById('incomeForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            const updatedEntry = {
                amount: parseFloat(document.getElementById('incomeAmount').value),
                source: document.getElementById('incomeSource').value,
                date: document.getElementById('incomeDate').value,
                notes: document.getElementById('incomeNotes').value,
                timestamp: entry.timestamp
            };

            if (storage.updateIncome(id, updatedEntry)) {
                utils.showNotification('Income entry updated successfully');
                form.reset();
                form.onsubmit = income.handleIncomeSubmit;
                income.renderIncomeList();
                dashboard.updateSummary();
            } else {
                utils.showNotification('Error updating income entry', 'error');
            }
        };
    },

    deleteIncome: function(id) {
        if (confirm(translator.getText('common.confirmDelete'))) {
            if (storage.deleteIncome(id)) {
                utils.showNotification('Income entry deleted successfully');
                income.renderIncomeList();
                dashboard.updateSummary();
            } else {
                utils.showNotification('Error deleting income entry', 'error');
            }
        }
    }
};