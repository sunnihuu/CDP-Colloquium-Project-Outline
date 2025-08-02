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
    disableLayout: false,

    // On ready callback
    ready: function() {
        initializeIndexInteractions();
    }
});

// Index page expand/collapse functionality
function initializeIndexInteractions() {
    const expandableItems = document.querySelectorAll('.index-slide .expandable');
    
    expandableItems.forEach(item => {
        const mainItem = item.querySelector('.main-item');
        const toggleIcon = item.querySelector('.toggle-icon');
        
        mainItem.addEventListener('click', function() {
            item.classList.toggle('collapsed');
            
            // Update icon rotation
            if (item.classList.contains('collapsed')) {
                toggleIcon.style.transform = 'rotate(-90deg)';
            } else {
                toggleIcon.style.transform = 'rotate(0deg)';
            }
        });
        
        // Add hover effect
        mainItem.addEventListener('mouseenter', function() {
            if (!item.classList.contains('collapsed')) {
                toggleIcon.style.color = '#1a4004';
            }
        });
        
        mainItem.addEventListener('mouseleave', function() {
            toggleIcon.style.color = '#296307';
        });
    });
}

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

// Interactive Image Pan & Zoom Functionality
function initializeImageInteractions() {
    const imageContainer = document.getElementById('imageContainer');
    const image = document.getElementById('precedentImage');
    
    if (!imageContainer || !image) return;
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let lastTranslateX = 0;
    let lastTranslateY = 0;
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.className = 'reset-btn';
    resetButton.id = 'resetZoom';
    resetButton.textContent = 'Reset';
    imageContainer.appendChild(resetButton);
    
    // Update image transform
    function updateTransform() {
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Reset function for double-click
    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateTransform();
    }
    
    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        scale = Math.max(0.5, Math.min(5, scale * delta));
        updateTransform();
    });
    
    // Touch/Mouse drag for panning
    function startDrag(clientX, clientY) {
        isDragging = true;
        startX = clientX - translateX;
        startY = clientY - translateY;
        imageContainer.style.cursor = 'grabbing';
    }
    
    function drag(clientX, clientY) {
        if (!isDragging) return;
        translateX = clientX - startX;
        translateY = clientY - startY;
        updateTransform();
    }
    
    function endDrag() {
        isDragging = false;
        imageContainer.style.cursor = 'grab';
    }
    
    // Mouse events
    imageContainer.addEventListener('mousedown', function(e) {
        e.preventDefault();
        startDrag(e.clientX, e.clientY);
    });
    
    document.addEventListener('mousemove', function(e) {
        drag(e.clientX, e.clientY);
    });
    
    document.addEventListener('mouseup', endDrag);
    
    // Touch events
    imageContainer.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    });
    
    imageContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();
        const touch = e.touches[0];
        drag(touch.clientX, touch.clientY);
    });
    
    imageContainer.addEventListener('touchend', function(e) {
        e.preventDefault();
        endDrag();
    });
    
    // Reset button event listener
    document.getElementById('resetZoom').addEventListener('click', resetZoom);
    
    // Double-click to reset
    imageContainer.addEventListener('dblclick', resetZoom);
}

// Initialize image interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for image to load
    setTimeout(initializeImageInteractions, 500);
});

// Also initialize when slide changes
Reveal.on('slidechanged', function(event) {
    if (event.currentSlide.querySelector('#imageContainer')) {
        setTimeout(initializeImageInteractions, 100);
    }
});
