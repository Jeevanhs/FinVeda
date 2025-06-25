// Financial education resources
const resources = {
    articles: [
        {
            id: 1,
            title: 'Getting Started with Budgeting',
            content: 'Learn the basics of creating and maintaining a budget...',
            category: 'Budgeting'
        },
        {
            id: 2,
            title: 'Emergency Fund Basics',
            content: 'Why you need an emergency fund and how to build one...',
            category: 'Savings'
        },
        {
            id: 3,
            title: 'Smart Investment Strategies',
            content: 'Understanding different investment options...',
            category: 'Investments'
        }
    ],

    calculators: {
        savings: (principal, monthlyDeposit, interestRate, years) => {
            const monthlyRate = interestRate / 12 / 100;
            const months = years * 12;
            let total = principal;

            for (let i = 0; i < months; i++) {
                total += monthlyDeposit;
                total *= (1 + monthlyRate);
            }

            return total;
        },

        loan: (principal, interestRate, years) => {
            const monthlyRate = interestRate / 12 / 100;
            const months = years * 12;
            const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / 
                                 (Math.pow(1 + monthlyRate, months) - 1);
            
            return {
                monthlyPayment,
                totalPayment: monthlyPayment * months,
                totalInterest: (monthlyPayment * months) - principal
            };
        }
    },

    init: () => {
        resources.renderArticles();
        resources.initializeCalculators();
    },

    renderArticles: () => {
        const articlesList = document.getElementById('articlesList');
        articlesList.innerHTML = resources.articles.map(article => `
            <div class="article-card">
                <h3>${article.title}</h3>
                <span class="category">${article.category}</span>
                <p>${article.content}</p>
                <button onclick="resources.showFullArticle(${article.id})" class="btn-primary">
                    Read More
                </button>
            </div>
        `).join('');
    },

    showFullArticle: (id) => {
        const article = resources.articles.find(a => a.id === id);
        if (!article) return;

        // Implementation for showing full article content
        console.log('Show full article:', article);
    },

    initializeCalculators: () => {
        const calculatorBtns = document.querySelectorAll('.calculator-btn');
        calculatorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const calculatorType = e.target.dataset.calculator;
                resources.showCalculator(calculatorType);
            });
        });
    },

    showCalculator: (type) => {
        // Implementation for showing calculator modal
        console.log('Show calculator:', type);
    }
};