// Simple background slideshow
document.addEventListener('DOMContentLoaded', function() {
    // Images to cycle through
    const images = [
        'images/svg/hero-bg.png',
        'images/svg/hero-bg2.png',
        'images/svg/hero-bg3.png'
    ];
    
    const hero = document.querySelector('.hero');
    let currentIndex = 0;
    
    // Start with the first image (already set in CSS)
    
    // Change image every 5 seconds
    setInterval(function() {
        // Increment image index
        currentIndex = (currentIndex + 1) % images.length;
        
        // Change the background image
        hero.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${images[currentIndex]})`;
    }, 5000);
}); 