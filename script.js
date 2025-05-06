document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    if (mobileMenuBtn && mobileMenu && mobileMenuClose) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            navLinks.classList.toggle('active');
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        });
    }

    // Handle dropdowns on mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.main-nav')) {
            mobileMenu.classList.remove('active');
            navLinks.classList.remove('active');
            dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Filter and Sort Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.querySelector('.sort-select');
    const programCards = document.querySelectorAll('.program-card');
    const newsCards = document.querySelectorAll('.news-card');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');
                
                const filter = button.dataset.filter;
                filterItems(filter);
            });
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortBy = sortSelect.value;
            sortItems(sortBy);
        });
    }

    function filterItems(filter) {
        const items = document.querySelectorAll('.program-card, .news-card');
        items.forEach(item => {
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
        const items = Array.from(container.children);

        items.sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            } else if (sortBy === 'name') {
                return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
            }
        });

        items.forEach(item => container.appendChild(item));
    }

    // Scroll Progress Bar
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (window.scrollY / windowHeight) * 100;
            scrollProgress.style.width = `${scrolled}%`;
        });
    }

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.program-card, .news-card, .stat-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        observer.observe(card);
    });

    // Form Validation and Enhancement
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading spinner
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = '<div class="loading-spinner"></div>';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                submitBtn.textContent = originalText;
                alert('Form submitted successfully!');
            }, 1500);
        });
    });

    // Enhanced Navigation
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}); 