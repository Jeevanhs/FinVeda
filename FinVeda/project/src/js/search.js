// Search Functionality
function showSuggestions() {
    const input = document.getElementById('file-search');
    const suggestionsList = document.getElementById('suggestions-list');
    
    if (input.value.length > 0) {
        suggestionsList.style.display = 'block';
        // Add your search logic here
    } else {
        suggestionsList.style.display = 'none';
    }
}

function navigateSuggestions(event) {
    // Add keyboard navigation logic here
}