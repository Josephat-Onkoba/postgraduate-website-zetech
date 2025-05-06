// Wait for both DOMContentLoaded and componentsLoaded events
let domLoaded = false;
let componentsLoaded = false;

function initializeAll() {
    if (domLoaded && componentsLoaded) {
        // Initialize navigation
        initializeNavigation();

        // Initialize other features
        initializeSmoothScroll();
        initializeActivePage();
        initializeNewsletterForm();
        initializeFilterAndSort();
        initializeScrollProgress();
        initializeBackToTop();
        initializeAnimations();
        initializeFormValidation();
        initializeNavListLinks();
    }
}

document.addEventListener('DOMContentLoaded', function() {
    domLoaded = true;
    initializeAll();
});

document.addEventListener('componentsLoaded', function() {
    componentsLoaded = true;
    initializeAll();
});

function initializeNavigation() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (!mobileMenuBtn || !navLinks) return;

    // Mobile menu functionality
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Handle dropdowns on mobile
    dropdowns.forEach(function(dropdown) {
        const link = dropdown.querySelector('a');
        if (!link) return;

        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            dropdowns.forEach(function(dropdown) {
                dropdown.classList.remove('active');
            });
        }
    });
}

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(function(link) {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initializeNewsletterForm() {
    const newsletterForm = document.getElementById('newsletterForm');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('newsletterEmail');
        if (emailInput && emailInput.value) {
            // Here you would typically send this to your backend
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        }
    });
}

function initializeFilterAndSort() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.querySelector('.sort-select');
    const programCards = document.querySelectorAll('.program-card');
    const newsCards = document.querySelectorAll('.news-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                filterButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });
                this.classList.add('active');
                const filter = this.dataset.filter;
                filterItems(filter);
            });
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortItems(sortBy);
        });
    }
}

function filterItems(filter) {
    const items = document.querySelectorAll('.program-card, .news-card');
    items.forEach(function(item) {
        if (filter === 'all' || item.dataset.category === filter) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.6s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

function sortItems(sortBy) {
    const container = document.querySelector('.programs-grid, .news-grid');
    if (!container) return;

    const items = Array.from(container.children);
    items.sort(function(a, b) {
        if (sortBy === 'date') {
            return new Date(b.dataset.date) - new Date(a.dataset.date);
        } else if (sortBy === 'name') {
            return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
        }
        return 0;
    });

    items.forEach(function(item) {
        container.appendChild(item);
    });
}

function initializeScrollProgress() {
    const scrollProgress = document.querySelector('.scroll-progress');
    if (!scrollProgress) return;

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

function initializeBackToTop() {
    const backToTop = document.querySelector('.back-to-top');
    if (!backToTop) return;

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.program-card, .news-card, .stat-card').forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });
}

function formSubmitCallback(submitBtn, originalText) {
    submitBtn.textContent = originalText;
    alert('Form submitted successfully!');
}

function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(formSubmitCallback, 1500, submitBtn, originalText);
        });
    });
}

function initializeNavListLinks() {
    const navListLinks = document.querySelectorAll('.nav-list a');
    navListLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
} 