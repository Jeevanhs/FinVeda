// Chart configurations and updates
const charts = {
    financeChart: null,

    initializeCharts: () => {
        const ctx = document.getElementById('financeChart').getContext('2d');
        charts.financeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Income',
                        backgroundColor: '#27ae60',
                        data: []
                    },
                    {
                        label: 'Expenses',
                        backgroundColor: '#e74c3c',
                        data: []
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Amount (₹)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        });
    },

    updateFinanceChart: () => {
        const income = storage.getIncome();
        const expenses = storage.getExpenses();
        const months = {};

        // Process income
        income.forEach(inc => {
            const date = new Date(inc.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            months[monthKey] = months[monthKey] || { income: 0, expenses: 0 };
            months[monthKey].income += inc.amount;
        });

        // Process expenses
        expenses.forEach(exp => {
            const date = new Date(exp.date);
            const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
            months[monthKey] = months[monthKey] || { income: 0, expenses: 0 };
            months[monthKey].expenses += exp.amount;
        });

        // Sort months
        const sortedMonths = Object.entries(months)
            .sort(([a], [b]) => a.localeCompare(b))
            .slice(-6); // Show last 6 months

        const labels = sortedMonths.map(([month]) => {
            const [year, monthNum] = month.split('-');
            return new Date(year, monthNum - 1).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' });
        });

        const incomeData = sortedMonths.map(([, data]) => data.income);
        const expenseData = sortedMonths.map(([, data]) => data.expenses);

        charts.financeChart.data.labels = labels;
        charts.financeChart.data.datasets[0].data = incomeData;
        charts.financeChart.data.datasets[1].data = expenseData;
        charts.financeChart.update();
    }
};