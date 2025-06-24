// Home Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = menuToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mobileNav && mobileNav.classList.contains('active')) {
            if (!mobileNav.contains(event.target) && event.target !== menuToggle && !menuToggle.contains(event.target)) {
                mobileNav.classList.remove('active');
                
                // Reset icon
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Sticky Header Shadow
    const header = document.querySelector('.header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 10) {
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            } else {
                header.style.boxShadow = 'none';
            }
        });
    }

    // Hero Slider Functionality
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlay;
        
        // Function to show specific slide
        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            if (dots.length > 0) {
                dots.forEach(dot => dot.classList.remove('active'));
            }
            
            // Add active class to current slide and dot
            slides[index].classList.add('active');
            if (dots[index]) {
                dots[index].classList.add('active');
            }
            
            currentSlide = index;
        }
        
        // Next slide function
        function nextSlide() {
            const next = (currentSlide + 1) % totalSlides;
            showSlide(next);
        }
        
        // Previous slide function
        function prevSlideFunc() {
            const prev = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(prev);
        }
        
        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlideFunc);
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
        
        // Auto-play slider
        function startAutoPlay() {
            autoPlay = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function stopAutoPlay() {
            clearInterval(autoPlay);
        }
        
        // Start auto-play
        startAutoPlay();
        
        // Pause auto-play on hover
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', stopAutoPlay);
            heroSection.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartNotification = document.getElementById('cartNotification');
    const notificationText = document.getElementById('notificationText');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get product info from parent elements
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Show add to cart animation
            this.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
            this.disabled = true;
            
            // Update notification text
            notificationText.textContent = `${productName} added to cart!`;
            
            // Show notification
            cartNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                cartNotification.classList.remove('show');
            }, 3000);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-shopping-bag"></i> Add to Cart';
                this.disabled = false;
            }, 2000);
        });
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // Simulate form submission
                const submitButton = this.querySelector('button');
                const originalText = submitButton.textContent;
                
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
                
                setTimeout(() => {
                    submitButton.textContent = 'Subscribed!';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                    }, 2000);
                }, 1500);
            }
        });
    }

    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    if (animateElements.length > 0) {
        // Check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
                rect.bottom >= 0
            );
        }
        
        // Add animation class when element is in viewport
        function checkAnimations() {
            animateElements.forEach(element => {
                if (isInViewport(element) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Check animations on scroll
        window.addEventListener('scroll', checkAnimations);
        
        // Check animations on page load
        checkAnimations();
    }

    // Hero Image Parallax Effect (untuk hero lama, bisa dihapus kalau sudah pakai slider)
    const heroImage = document.querySelector('.hero-image img');
    
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < 600) {
                const translateY = scrollPosition * 0.1;
                heroImage.style.transform = `translateY(${translateY}px)`;
            }
        });
    }
    
    // Service Cards Hover Effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            serviceCards.forEach(c => c.style.opacity = '0.7');
            card.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            serviceCards.forEach(c => c.style.opacity = '1');
        });
    });
    
    // Booking Button Animation
    const bookingButtons = document.querySelectorAll('.btn-primary');
    
    bookingButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
    });
});