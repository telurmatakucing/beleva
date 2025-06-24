// Filter functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get category to filter
            const category = this.getAttribute('data-category');
            
            // Filter logic would go here
            console.log(`Filtering by: ${category}`);
            
            // For demo purposes, we'll just log the category
            // In a real implementation, you would filter the articles based on the category
        });
    });
    
    // Search functionality
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchBox.value.trim();
            if (searchTerm) {
                console.log(`Searching for: ${searchTerm}`);
                // Search logic would go here
            }
        });
    }
    
    // Handle search on Enter key press
    if (searchBox) {
        searchBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log(`Searching for: ${searchTerm}`);
                    // Search logic would go here
                }
            }
        });
    }
    
    // Slider functionality for related articles
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const articlesSlider = document.querySelector('.articles-slider');
    
    if (prevBtn && nextBtn && articlesSlider) {
        // This is a simplified slider implementation
        // In a real implementation, you would use a proper slider library or more complex logic
        
        nextBtn.addEventListener('click', function() {
            articlesSlider.scrollBy({
                left: 330, // Approximate width of one article card + gap
                behavior: 'smooth'
            });
        });
        
        prevBtn.addEventListener('click', function() {
            articlesSlider.scrollBy({
                left: -330, // Approximate width of one article card + gap
                behavior: 'smooth'
            });
        });
    }
    
    // Comment form submission
    const commentForm = document.querySelector('.comment-form');
    
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const commentInput = document.getElementById('comment');
            
            if (nameInput && emailInput && commentInput) {
                const name = nameInput.value.trim();
                const email = emailInput.value.trim();
                const comment = commentInput.value.trim();
                
                if (name && email && comment) {
                    console.log('Comment submitted:', {
                        name,
                        email,
                        comment
                    });
                    
                    // In a real implementation, you would send this data to the server
                    // and then update the UI to show the new comment
                    
                    // Clear the form
                    nameInput.value = '';
                    emailInput.value = '';
                    commentInput.value = '';
                    
                    // Show success message
                    alert('Komentar Anda telah berhasil dikirim dan sedang menunggu moderasi. Terima kasih!');
                }
            }
        });
    }
    
    // Animation on scroll
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkIfInView();
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
});