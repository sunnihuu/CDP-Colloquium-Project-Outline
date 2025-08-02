// Presentation JavaScript

// Initialize reveal.js with custom configuration
Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    // Presentation controls
    controls: true,
    progress: true,
    center: true,
    touch: true,
    loop: false,
    rtl: false,
    shuffle: false,
    fragments: true,
    embedded: false,
    help: true,
    showNotes: false,
    autoPlayMedia: null,
    autoSlide: 0,
    autoSlideStoppable: true,
    mouseWheel: false,
    hideAddressBar: true,
    previewLinks: false,
    focusBodyOnPageVisibilityChange: true,

    // Theme and view settings
    parallaxBackgroundImage: '',
    parallaxBackgroundSize: '',
    parallaxBackgroundRepeat: '',
    parallaxBackgroundPosition: '',
    parallaxBackgroundHorizontal: 0,
    parallaxBackgroundVertical: 0,

    // Keyboard navigation
    keyboard: {
        13: 'next', // Enter key
        32: 'next', // Space bar
        37: 'prev', // Left arrow
        39: 'next', // Right arrow
        38: 'prev', // Up arrow
        40: 'next', // Down arrow
    },

    // Learn about plugins: https://revealjs.com/plugins/
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ],

    // Custom options
    margin: 0.1,
    minScale: 0.2,
    maxScale: 2.0,
    disableLayout: false
});

// Custom presentation functions
function initPresentationFeatures() {
    // Add custom keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Press 'f' for fullscreen
        if (event.key === 'f') {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        }
        
        // Press 'o' for overview mode
        if (event.key === 'o') {
            Reveal.toggleOverview();
        }
        
        // Press 's' for speaker notes
        if (event.key === 's') {
            Reveal.toggleHelp();
        }
    });

    // Add slide counter
    function updateSlideCounter() {
        const current = Reveal.getIndices().h + 1;
        const total = Reveal.getTotalSlides();
        
        // Create or update slide counter
        let counter = document.getElementById('slide-counter');
        if (!counter) {
            counter = document.createElement('div');
            counter.id = 'slide-counter';
            counter.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 5px 10px;
                border-radius: 3px;
                font-family: "IBM Plex Mono", monospace;
                font-size: 12px;
                z-index: 1000;
            `;
            document.body.appendChild(counter);
        }
        counter.textContent = `${current} / ${total}`;
    }

    // Update counter on slide change
    Reveal.on('slidechanged', updateSlideCounter);
    Reveal.on('ready', updateSlideCounter);

    // Add presentation timer
    function initTimer() {
        const startTime = Date.now();
        
        const timer = document.createElement('div');
        timer.id = 'presentation-timer';
        timer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 5px 10px;
            border-radius: 3px;
            font-family: "IBM Plex Mono", monospace;
            font-size: 12px;
            z-index: 1000;
        `;
        document.body.appendChild(timer);

        function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const minutes = Math.floor(elapsed / 60);
            const seconds = elapsed % 60;
            timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        setInterval(updateTimer, 1000);
    }

    // Initialize timer when presentation starts
    Reveal.on('ready', initTimer);
}

// Initialize custom features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initPresentationFeatures();
});

// Add smooth scrolling for any internal links
document.addEventListener('click', function(event) {
    if (event.target.tagName === 'A' && event.target.getAttribute('href').startsWith('#')) {
        event.preventDefault();
        const targetId = event.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Auto-hide cursor during presentation
let cursorTimeout;
document.addEventListener('mousemove', function() {
    document.body.style.cursor = 'default';
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(function() {
        if (Reveal.isOverview() === false) {
            document.body.style.cursor = 'none';
        }
    }, 3000);
});

// Show cursor when in overview mode
Reveal.on('overviewshown', function() {
    document.body.style.cursor = 'default';
    clearTimeout(cursorTimeout);
});

Reveal.on('overviewhidden', function() {
    // Reset cursor timeout when leaving overview
    clearTimeout(cursorTimeout);
    cursorTimeout = setTimeout(function() {
        document.body.style.cursor = 'none';
    }, 3000);
});
