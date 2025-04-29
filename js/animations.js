// Additional interactive features for Galaxy Training Center website

document.addEventListener('DOMContentLoaded', function() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }
    
    // Check on page load
    checkReveal();
    
    // Check on scroll
    window.addEventListener('scroll', checkReveal);
    
    // Typing animation for hero section
    const heroHeading = document.querySelector('.hero h1');
    if (heroHeading) {
        heroHeading.classList.add('typing');
    }
    
    // Smooth hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Program cards hover effect
    const programCards = document.querySelectorAll('.program-card');
    programCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    // Partner items hover effect
    const partnerItems = document.querySelectorAll('.partner-item');
    partnerItems.forEach(item => {
        item.classList.add('hover-glow');
    });
    
    // Staggered animation for stats items
    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        item.classList.add('stagger-item', 'slide-up');
    });
    
    // Staggered animation for service cards
    serviceCards.forEach(card => {
        card.classList.add('stagger-item', 'fade-in');
    });
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.hero-buttons .btn-primary, .programs-cta .btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
    });
    
    // Add bounce animation to scroll indicator (if exists)
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.classList.add('bounce');
    }
    
    // Add shimmer effect to section dividers
    const sectionDividers = document.querySelectorAll('.section-divider');
    sectionDividers.forEach(divider => {
        divider.classList.add('shimmer');
    });
    
    // Add slide-in animations to about content
    const aboutText = document.querySelector('.about-text');
    const aboutHighlights = document.querySelector('.about-highlights');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left', 'reveal');
    }
    
    if (aboutHighlights) {
        aboutHighlights.classList.add('slide-in-right', 'reveal');
    }
    
    // Add scale-up animation to highlight icons
    const highlightIcons = document.querySelectorAll('.highlight-icon');
    highlightIcons.forEach(icon => {
        icon.classList.add('scale-up', 'reveal');
    });
    
    // Add rotate animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon i');
    serviceIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.classList.add('rotate');
        });
        
        icon.addEventListener('mouseleave', function() {
            this.classList.remove('rotate');
        });
    });
    
    // Add smooth transition to navigation links
    const navLinks = document.querySelectorAll('.nav-item a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
    
    // Add smooth transition to testimonial slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    testimonialItems.forEach(item => {
        item.style.transition = 'opacity 0.5s ease';
    });
    
    // Add interactive form validation with visual feedback
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            // Add focus effects
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                
                // Validate on blur
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.parentElement.classList.add('error');
                } else {
                    this.parentElement.classList.remove('error');
                }
                
                // Email validation
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(this.value)) {
                        this.parentElement.classList.add('error');
                    }
                }
            });
            
            // Show validation status as user types
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.parentElement.classList.remove('error');
                }
                
                if (this.type === 'email' && this.value.trim()) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailPattern.test(this.value)) {
                        this.parentElement.classList.remove('error');
                    }
                }
            });
        });
    }
    
    // Add interactive program filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add smooth scroll behavior for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Add highlight effect to target section
                targetElement.classList.add('highlight-section');
                
                // Remove highlight after animation completes
                setTimeout(() => {
                    targetElement.classList.remove('highlight-section');
                }, 1500);
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

let testimonialInterval; // Add this at the top of your file (outside functions)

function autoSlideTestimonials() {
    if (window.innerWidth > 576) {
        // On larger screens, show only the first testimonial and clear interval
        clearInterval(testimonialInterval);
        const testimonials = document.querySelectorAll('.testimonial-item');
        testimonials.forEach((item, i) => {
            item.style.display = i === 0 ? 'block' : 'none';
        });
        return;
    }
    const testimonials = document.querySelectorAll('.testimonial-item');
    let current = 0;
    testimonials.forEach((item, i) => {
        item.style.display = i === 0 ? 'block' : 'none';
    });
    clearInterval(testimonialInterval); // Prevent multiple intervals
    testimonialInterval = setInterval(() => {
        testimonials[current].style.display = 'none';
        current = (current + 1) % testimonials.length;
        testimonials[current].style.display = 'block';
    }, 4000);
}

document.addEventListener('DOMContentLoaded', autoSlideTestimonials);
window.addEventListener('resize', autoSlideTestimonials);
