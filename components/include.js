// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading component ${componentPath}:`, error);
    }
}

// Load navigation and footer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('nav-placeholder', 'components/nav.html');
    loadComponent('footer-placeholder', 'components/footer.html');
}); 