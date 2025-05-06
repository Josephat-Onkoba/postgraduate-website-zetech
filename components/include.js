// Function to load HTML components
function loadComponent(elementId, componentPath) {
    fetch(componentPath)
        .then(response => response.text())
        .then(html => {
            document.getElementById(elementId).innerHTML = html;
            // Initialize navigation immediately after loading
            if (elementId === 'nav-placeholder') {
                initializeNavigation();
            }
        })
        .catch(error => console.error(`Error loading component ${componentPath}:`, error));
}

// Load navigation and footer when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadComponent('nav-placeholder', 'components/nav.html');
    loadComponent('footer-placeholder', 'components/footer.html');
}); 