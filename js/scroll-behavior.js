// Variables to track scroll position
let lastScroll = 0;
const header = document.querySelector('.header');
const delta = 5;
let didScroll = false;

// Add scroll event listener
window.addEventListener('scroll', () => {
    didScroll = true;
});

// Check scroll position every 250ms
setInterval(() => {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    const currentScroll = window.pageYOffset;
    
    // Make sure they scroll more than delta
    if (Math.abs(lastScroll - currentScroll) <= delta) {
        return;
    }

    // If current scroll position is greater than last scroll position (scrolling down)
    if (currentScroll > lastScroll && currentScroll > 50) {
        header.classList.remove('nav-down');
        header.classList.add('nav-up');
    } else {
        // Scrolling up
        if (currentScroll + window.innerHeight < document.documentElement.scrollHeight) {
            header.classList.remove('nav-up');
            header.classList.add('nav-down');
        }
    }

    lastScroll = currentScroll;
} 