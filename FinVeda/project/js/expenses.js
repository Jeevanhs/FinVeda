// Expense management functionality
const expenses = {
    categories: {
        food: { label: 'Food', color: '#e74c3c' },
        transportation: { label: 'Transportation', color: '#3498db' },
        utilities: { label: 'Utilities', color: '#2ecc71' },
        healthcare: { label: 'Healthcare', color: '#9b59b6' },
        education: { label: 'Education', color: '#f1c40f' },
        farming: { label: 'Farming Supplies', color: '#1abc9c' },
        others: { label: 'Others', color: '#95a5a6' }
    },

    init: () => {
        const expenseForm = document.getElementById('expenseForm');
        expenseForm.addEventListener('submit', expenses.handleExpenseSubmit);
        expenses.renderExpensesList();
        expenses.renderCategorySummary();
    },

    handleExpenseSubmit: (event) => {
        event.preventDefault();
        
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        const date = document.getElementById('expenseDate').value;
        const notes = document.getElementById('expenseNotes').value;

        const expense = {
            amount,
            category,
            date,
            notes,
            timestamp: Date.now()
        };

        if (storage.addExpense(expense)) {
            utils.showNotification('Expense added successfully');
            event.target.reset();
            expenses.renderExpensesList();
            expenses.renderCategorySummary();
            charts.updateFinanceChart();
            dashboard.updateSummary();
        } else {
            utils.showNotification('Error adding expense', 'error');
        }
    },

    renderCategorySummary: () => {
        const allExpenses = storage.getExpenses();
        const summary = document.createElement('div');
        summary.className = 'expense-summary';

        const categoryTotals = {};
        let totalExpenses = 0;

        // Calculate totals
        allExpenses.forEach(expense => {
            categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
            totalExpenses += expense.amount;
        });

        // Create category cards
        Object.entries(expenses.categories).forEach(([category, info]) => {
            const amount = categoryTotals[category] || 0;
            const percentage = totalExpenses ? ((amount / totalExpenses) * 100).toFixed(1) : 0;

            const card = document.createElement('div');
            card.className = `category-card ${category}`;
            card.innerHTML = `
                <div class="category-title">${info.label}</div>
                <div class="category-amount">${utils.formatCurrency(amount)}</div>
                <div class="category-percentage">${percentage}% of total</div>
            `;
            summary.appendChild(card);
        });

        // Insert summary before expense list
        const expenseList = document.getElementById('expensesList');
        expenseList.parentNode.insertBefore(summary, expenseList);
    },

    renderExpensesList: () => {
        const expensesList = document.getElementById('expensesList');
        const expenses = storage.getExpenses();

        expensesList.innerHTML = expenses
            .sort((a, b) => b.timestamp - a.timestamp)
            .map(expense => `
                <div class="expense-item" data-id="${expense.id}">
                    <div class="expense-details">
                        <div class="expense-amount">${utils.formatCurrency(expense.amount)}</div>
                        <div class="expense-category ${expense.category}">
                            ${translator.getText(`expenses.categories.${expense.category}`)}
                        </div>
                        <div class="expense-date">${utils.formatDate(expense.date)}</div>
                        ${expense.notes ? `<div class="expense-notes">${expense.notes}</div>` : ''}
                    </div>
                    <div class="action-buttons">
                        <button class="btn-edit" onclick="expenses.editExpense('${expense.id}')">
                            ${translator.getText('common.edit')}
                        </button>
                        <button class="btn-delete" onclick="expenses.deleteExpense('${expense.id}')">
                            ${translator.getText('common.delete')}
                        </button>
                    </div>
                </div>
            `).join('');
    },

    editExpense: (id) => {
        const expense = storage.getExpenses().find(exp => exp.id === id);
        if (!expense) return;

        document.getElementById('expenseAmount').value = expense.amount;
        document.getElementById('expenseCategory').value = expense.category;
        document.getElementById('expenseDate').value = expense.date;
        document.getElementById('expenseNotes').value = expense.notes;

        const form = document.getElementById('expenseForm');
        form.onsubmit = (e) => {
            e.preventDefault();
            const updatedExpense = {
                amount: parseFloat(document.getElementById('expenseAmount').value),
                category: document.getElementById('expenseCategory').value,
                date: document.getElementById('expenseDate').value,
                notes: document.getElementById('expenseNotes').value,
                timestamp: expense.timestamp
            };

            if (storage.updateExpense(id, updatedExpense)) {
                utils.showNotification('Expense updated successfully');
                form.reset();
                form.onsubmit = expenses.handleExpenseSubmit;
                expenses.renderExpensesList();
                expenses.renderCategorySummary();
                charts.updateFinanceChart();
                dashboard.updateSummary();
            } else {
                utils.showNotification('Error updating expense', 'error');
            }
        };
    },

    deleteExpense: (id) => {
        if (confirm(translator.getText('common.confirmDelete'))) {
            if (storage.deleteExpense(id)) {
                utils.showNotification('Expense deleted successfully');
                expenses.renderExpensesList();
                expenses.renderCategorySummary();
                charts.updateFinanceChart();
                dashboard.updateSummary();
            } else {
                utils.showNotification('Error deleting expense', 'error');
            }
        }
    }
};