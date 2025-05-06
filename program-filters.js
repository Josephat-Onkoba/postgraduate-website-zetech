document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.querySelector('#sort-select');
    const programCards = document.querySelectorAll('.program-card');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');
            
            programCards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = 'block';
                } else {
                    const category = card.getAttribute('data-category');
                    card.style.display = category.includes(filter) ? 'block' : 'none';
                }
            });

            // Re-apply current sort after filtering
            sortPrograms(sortSelect.value);
        });
    });

    // Sort functionality
    function sortPrograms(criteria) {
        const cards = Array.from(programCards);
        const container = cards[0].parentNode;

        cards.sort((a, b) => {
            if (criteria === 'name') {
                const nameA = a.querySelector('h3').textContent.toLowerCase();
                const nameB = b.querySelector('h3').textContent.toLowerCase();
                return nameA.localeCompare(nameB);
            } else if (criteria === 'duration') {
                const durationA = parseInt(a.querySelector('.program-details').textContent.match(/(\d+)/)[0]);
                const durationB = parseInt(b.querySelector('.program-details').textContent.match(/(\d+)/)[0]);
                return durationA - durationB;
            }
            return 0;
        });

        // Remove existing cards
        cards.forEach(card => card.remove());

        // Add sorted cards back
        cards.forEach(card => {
            if (card.style.display !== 'none') {
                container.appendChild(card);
            }
        });
    }

    sortSelect.addEventListener('change', (e) => {
        sortPrograms(e.target.value);
    });

    // Add data attributes to program cards
    programCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        if (title.includes('computer science')) {
            card.setAttribute('data-category', 'computer-science');
        } else if (title.includes('information technology')) {
            card.setAttribute('data-category', 'it');
        } else if (title.includes('business')) {
            card.setAttribute('data-category', 'business');
        }
    });

    // Initialize sorting
    sortPrograms(sortSelect.value);
}); 