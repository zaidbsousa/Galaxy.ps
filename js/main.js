// Galaxy Training Center Website JavaScript
// Handles animations, interactivity, and responsive behavior

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS animation library
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            overlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking overlay
    overlay.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    });

    // Mobile dropdown toggle
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const wasActive = item.classList.contains('active');
                
                // Close all other dropdowns
                dropdownItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                item.classList.toggle('active', !wasActive);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown') && !e.target.closest('.mobile-menu-toggle')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Close menu when window is resized above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            overlay.classList.remove('active');
            body.classList.remove('menu-open');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip if it's the back to top button
            if (this.classList.contains('back-to-top')) return;
            
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenuToggle && mobileMenuToggle.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Program Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const programCards = document.querySelectorAll('.program-card');
    const programsCta = document.querySelector('.programs-cta .btn-primary');

    function showOnlyFilter(filter) {
        programCards.forEach(card => {
            if (card.classList.contains(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Update CTA button text based on filter
        if (programsCta) {
            switch(filter) {
                case 'vocational':
                    programsCta.textContent = 'View All Programs';
                    break;
                case 'courses':
                    programsCta.textContent = 'View All Courses';
                    break;
                case 'ai':
                    programsCta.textContent = 'View All AI Courses';
                    break;
            }
        }
    }

    // Set default filter to vocational on page load
    showOnlyFilter('vocational');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            showOnlyFilter(filter);
        });
    });

    // Testimonial Slider
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (testimonialItems.length > 0 && prevBtn && nextBtn) {
        let current = 0;
        
        // Hide all testimonials except the first one
        testimonialItems.forEach((item, index) => {
            if (index !== 0) {
                item.style.display = 'none';
            }
        });
        
        // Show testimonial at current index
        function showTestimonial(index) {
            testimonialItems.forEach((item, i) => {
                item.style.display = (i === index) ? 'block' : 'none';
            });
        }
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            current = (current - 1 + testimonialItems.length) % testimonialItems.length;
            showTestimonial(current);
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            current = (current + 1) % testimonialItems.length;
            showTestimonial(current);
        });
        
        // Auto-rotate testimonials
        setInterval(function() {
            current++;
            if (current >= testimonialItems.length) {
                current = 0;
            }
            showTestimonial(current);
        }, 5000);
    }

    // Stats Counter Animation
    const counters = document.querySelectorAll('.counter');
    
    if (counters.length > 0) {
        const statsSection = document.querySelector('.stats');
        let counted = false;
        
        function startCounting() {
            if (counted) return;
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                let count = 0;
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 20); // Update every 20ms
                
                const timer = setInterval(() => {
                    count += increment;
                    
                    if (count >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count);
                    }
                }, 20);
            });
            
            counted = true;
        }
        
        // Start counting when stats section is in viewport
        window.addEventListener('scroll', function() {
            if (statsSection) {
                const sectionTop = statsSection.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.75) {
                    startCounting();
                }
            }
        });
        
        // Check on page load
        if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight * 0.75) {
            startCounting();
        }
    }

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            let valid = true;
            const requiredFields = contactForm.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = contactForm.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    valid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (valid) {
                // In a real implementation, you would send the form data to a server
                // For now, just show a success message
                const formData = new FormData(contactForm);
                let formValues = {};
                
                for (let [key, value] of formData.entries()) {
                    formValues[key] = value;
                }
                
                console.log('Form submitted:', formValues);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                
                contactForm.innerHTML = '';
                contactForm.appendChild(successMessage);
            }
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) {
        window.addEventListener('scroll', function() {
            const heroHeight = heroSection.offsetHeight;
            if (window.scrollY > heroHeight) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Initialize any partner logos carousel/slider if needed
    // This is a placeholder for future implementation
    const partnersGrid = document.querySelector('.partners-grid');
    
    if (partnersGrid) {
        // Placeholder for partner logos carousel implementation
        console.log('Partners grid initialized');
    }

    // Initialize partners carousel
    const partnersTrack = document.querySelector('.partners-track');
    if (partnersTrack) {
        // Clone the partner items to create infinite scroll effect
        const partnerItems = partnersTrack.querySelectorAll('.partner-item');
        const totalItems = partnerItems.length;
        
        // Clone items to create seamless loop
        for (let i = 0; i < totalItems; i++) {
            const clone = partnerItems[i].cloneNode(true);
            partnersTrack.appendChild(clone);
        }
        
        // Start animation after a small delay to ensure proper rendering
        setTimeout(() => {
            partnersTrack.classList.add('animate');
        }, 100);

        // Pause animation on hover
        partnersTrack.addEventListener('mouseenter', () => {
            partnersTrack.style.animationPlayState = 'paused';
        });

        partnersTrack.addEventListener('mouseleave', () => {
            partnersTrack.style.animationPlayState = 'running';
        });

        // Reset position when animation completes
        partnersTrack.addEventListener('animationiteration', () => {
            // Smoothly reset position without visible jump
            partnersTrack.style.animation = 'none';
            partnersTrack.offsetHeight; // Trigger reflow
            partnersTrack.style.animation = 'scroll 20s linear infinite';
        });
    }

    // Hero background image transition
    const bg1 = document.querySelector('.bg-1');
    const bg2 = document.querySelector('.bg-2');
    const bg3 = document.querySelector('.bg-3');
    const bg4 = document.querySelector('.bg-4');
    let currentBg = 1;

    function changeBackground() {
        // Reset all backgrounds to opacity 0
        bg1.style.opacity = '0';
        bg2.style.opacity = '0';
        bg3.style.opacity = '0';
        bg4.style.opacity = '0';

        // Set the next background to opacity 1
        if (currentBg === 1) {
            bg2.style.opacity = '1';
            currentBg = 2;
        } else if (currentBg === 2) {
            bg3.style.opacity = '1';
            currentBg = 3;
        } else if (currentBg === 3) {
            bg4.style.opacity = '1';
            currentBg = 4;
        } else {
            bg1.style.opacity = '1';
            currentBg = 1;
        }
    }

    // Change background every 5 seconds
    setInterval(changeBackground, 5000);

    // Add scroll direction detection for header
    let lastScrollTop = 0;
    const scrollThreshold = 10; // minimum scroll amount before triggering

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 576) {  // Only on mobile
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Check if scrolled more than threshold
            if (Math.abs(lastScrollTop - currentScroll) <= scrollThreshold) 
                return;
                
            // Scrolling down and not at the top
            if (currentScroll > lastScrollTop && currentScroll > header.offsetHeight) {
                header.classList.add('nav-up');
            } 
            // Scrolling up
            else {
                header.classList.remove('nav-up');
            }
            
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
        }
    }, { passive: true });

    const searchInput = document.querySelector('.hero-search input');
    const searchButton = document.querySelector('.hero-search button .button-text');
    const searchForm = document.querySelector('.hero-search');
    
    if (searchInput && searchButton && searchForm) {
        // Handle input changes
        searchInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                searchButton.textContent = 'Search';
            } else {
                searchButton.textContent = 'Explore All';
            }
        });

        // Handle form submission
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchValue = searchInput.value.trim();
            
            if (searchValue === '') {
                // If empty, scroll to programs section
                const programsSection = document.getElementById('programs');
                if (programsSection) {
                    programsSection.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // If there's search text, handle search (placeholder for future implementation)
                console.log('Searching for:', searchValue);
                // TODO: Implement search functionality
            }
        });
    }

    // Branch Showcase Touch Swipe Support
    (function() {
        const grid = document.querySelector('.branch-showcase .branch-grid');
        if (!grid) return;
        let isTouching = false;
        let startX = 0;
        let currentX = 0;
        let currentIndex = 0;
        const totalItems = grid.children.length;
        let autoPlayTimeout = null;
        let isMobile = window.matchMedia('(max-width: 576px)').matches;

        function setTranslate(index, animate = true) {
            if (!isMobile) return;
            // Looping logic
            if (index < 0) index = totalItems - 1;
            if (index >= totalItems) index = 0;
            grid.style.transition = animate ? 'transform 0.4s cubic-bezier(.4,1.3,.5,1)' : 'none';
            grid.style.transform = `translateX(${-index * 100}vw)`;
            grid.style.animation = 'none'; // Pause CSS auto-play
            currentIndex = index;
        }

        function resumeAutoPlay() {
            if (!isMobile) return;
            grid.style.transition = '';
            // If at last image, reset to first for seamless loop
            if (currentIndex >= totalItems - 1) {
                setTranslate(0, false);
            }
            grid.style.animation = 'branch-carousel-slide 30s linear infinite';
        }

        grid.addEventListener('touchstart', function(e) {
            if (!isMobile) return;
            isTouching = true;
            startX = e.touches[0].clientX;
            currentX = startX;
            grid.style.transition = 'none';
            grid.style.animation = 'none';
            if (autoPlayTimeout) clearTimeout(autoPlayTimeout);
        });

        grid.addEventListener('touchmove', function(e) {
            if (!isMobile || !isTouching) return;
            currentX = e.touches[0].clientX;
            const dx = currentX - startX;
            grid.style.transform = `translateX(${-currentIndex * 100 + dx / window.innerWidth * 100}vw)`;
        });

        grid.addEventListener('touchend', function(e) {
            if (!isMobile || !isTouching) return;
            isTouching = false;
            const dx = currentX - startX;
            if (Math.abs(dx) > 50) {
                if (dx < 0) {
                    setTranslate(currentIndex + 1); // Will loop if at end
                } else if (dx > 0) {
                    setTranslate(currentIndex - 1); // Will loop if at start
                } else {
                    setTranslate(currentIndex);
                }
            } else {
                setTranslate(currentIndex);
            }
            autoPlayTimeout = setTimeout(resumeAutoPlay, 3000);
        });

        // Pause auto-play on manual scroll (for accessibility)
        grid.addEventListener('mousedown', function() { grid.style.animation = 'none'; });
        grid.addEventListener('mouseup', function() { resumeAutoPlay(); });

        // On resize, update isMobile
        window.addEventListener('resize', function() {
            isMobile = window.matchMedia('(max-width: 576px)').matches;
            if (!isMobile) {
                grid.style.transform = '';
                grid.style.transition = '';
                grid.style.animation = '';
            }
        });
    })();
});
