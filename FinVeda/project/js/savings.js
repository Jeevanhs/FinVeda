// Savings goals management
const savings = {
    init: function() {
        const savingsGoalForm = document.getElementById('savingsGoalForm');
        savingsGoalForm.addEventListener('submit', savings.handleGoalSubmit);
        savings.renderGoalsList();
    },

    handleGoalSubmit: function(event) {
        event.preventDefault();

        const goal = {
            name: document.getElementById('goalName').value,
            targetAmount: parseFloat(document.getElementById('targetAmount').value),
            targetDate: document.getElementById('targetDate').value,
            currentAmount: 0,
            timestamp: Date.now()
        };

        if (storage.addSavingsGoal(goal)) {
            utils.showNotification('Savings goal added successfully');
            event.target.reset();
            savings.renderGoalsList();
            dashboard.updateSummary();
        } else {
            utils.showNotification('Error adding savings goal', 'error');
        }
    },

    renderGoalsList: function() {
        const goalsList = document.getElementById('goalsProgressList');
        const goals = storage.getSavingsGoals();

        goalsList.innerHTML = goals
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(goal => {
                const progress = utils.calculateProgress(goal.currentAmount, goal.targetAmount);
                return `
                    <div class="goal-item" data-id="${goal.id}">
                        <div class="goal-details">
                            <h3>${goal.name}</h3>
                            <div class="goal-amount">
                                ${utils.formatCurrency(goal.currentAmount)} / ${utils.formatCurrency(goal.targetAmount)}
                            </div>
                            <div class="goal-date">Target: ${utils.formatDate(goal.targetDate)}</div>
                            <div class="goal-progress">
                                <div class="progress-bar" style="width: ${progress}%"></div>
                            </div>
                        </div>
                        <div class="action-buttons">
                            <button class="btn-edit" onclick="savings.updateGoalProgress('${goal.id}')">
                                Update Progress
                            </button>
                            <button class="btn-delete" onclick="savings.deleteGoal('${goal.id}')">
                                ${translator.getText('common.delete')}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
    },

    updateGoalProgress: function(id) {
        const goal = storage.getSavingsGoals().find(g => g.id === id);
        if (!goal) return;

        const amount = prompt('Enter the new amount saved:', goal.currentAmount);
        if (amount === null) return;

        const newAmount = parseFloat(amount);
        if (isNaN(newAmount) || newAmount < 0) {
            utils.showNotification('Please enter a valid amount', 'error');
            return;
        }

        goal.currentAmount = newAmount;
        if (storage.updateSavingsGoal(id, goal)) {
            utils.showNotification('Progress updated successfully');
            savings.renderGoalsList();
            dashboard.updateSummary();
        } else {
            utils.showNotification('Error updating progress', 'error');
        }
    },

    deleteGoal: function(id) {
        if (confirm(translator.getText('common.confirmDelete'))) {
            if (storage.deleteSavingsGoal(id)) {
                utils.showNotification('Savings goal deleted successfully');
                savings.renderGoalsList();
                dashboard.updateSummary();
            } else {
                utils.showNotification('Error deleting savings goal', 'error');
            }
        }
    }
};