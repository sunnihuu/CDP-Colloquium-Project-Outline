// Presentation JavaScript

// Initialize reveal.js with custom configuration
Reveal.initialize({
    hash: true,
    transition: 'slide',
    transitionSpeed: 'default',
    backgroundTransition: 'fade',

    // Presentation controls
    controls: true,
    progress: false, // disable progress bar to avoid duplicate page indicators
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

    // Slide numbering - keep only one system
    slideNumber: 'c/t', // current/total format
    showSlideNumber: 'all', // show on all slides

    // Theme and view settings
    parallaxBackgroundImage: '',
    parallaxBackgroundSize: '',
    parallaxBackgroundRepeat: '',
    parallaxBackgroundPosition: '',
    parallaxBackgroundHorizontal: 0,
    parallaxBackgroundVertical: 0,

    // Better full screen handling
    width: '100%',
    height: '100%',
    margin: 0.15,
    minScale: 0.1,
    maxScale: 3.0,
    
    // Keyboard navigation
    keyboard: {
        13: 'next', // Enter key
        32: 'next', // Space bar
        37: 'prev', // Left arrow
        39: 'next', // Right arrow
        38: 'prev', // Up arrow
        40: 'next', // Down arrow
        70: function() { toggleFullScreen(); }, // F key for fullscreen
    },

    // Learn about plugins: https://revealjs.com/plugins/
    plugins: [ RevealMarkdown, RevealHighlight, RevealNotes ],

    // On ready callback
    ready: function() {
        initializeIndexInteractions();
        setupFullScreenHandling();
        
        // Log the actual slide count
        console.log('Total slides:', Reveal.getTotalSlides());
        console.log('Horizontal slides:', Reveal.getHorizontalSlides().length);
    }
});

// Full screen handling functions
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        document.exitFullscreen();
    }
}

function setupFullScreenHandling() {
    // Listen for fullscreen changes
    document.addEventListener('fullscreenchange', function() {
        console.log('Fullscreen changed:', document.fullscreenElement ? 'Entered' : 'Exited');
        
        // Force Reveal.js to recalculate layout
        setTimeout(function() {
            Reveal.layout();
        }, 100);
    });
    
    // Also listen for window resize (for manual fullscreen)
    window.addEventListener('resize', function() {
        setTimeout(function() {
            Reveal.layout();
        }, 100);
    });
}

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
    console.log('Initializing image interactions...');
    const imageContainer = document.getElementById('imageContainer');
    const image = document.getElementById('precedentImage');
    
    if (!imageContainer || !image) {
        console.log('Image container or image not found');
        return;
    }
    
    console.log('Image elements found, setting up interactions');
    
    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    
    // Center the image initially
    function centerImage() {
        translateX = 0;
        translateY = 0;
        scale = 1;
        updateTransform();
    }
    
    // Update image transform
    function updateTransform() {
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }
    
    // Mouse wheel zoom
    imageContainer.addEventListener('wheel', function(e) {
        e.preventDefault();
        const rect = imageContainer.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;
        
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        const newScale = Math.max(0.5, Math.min(5, scale * delta));
        
        // Zoom towards mouse position
        translateX = translateX - offsetX * (newScale - scale) / scale;
        translateY = translateY - offsetY * (newScale - scale) / scale;
        scale = newScale;
        
        updateTransform();
    });
    
    // Double-click to reset zoom
    imageContainer.addEventListener('dblclick', function(e) {
        e.preventDefault();
        centerImage();
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
    
    // Touch events for mobile
    imageContainer.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            startDrag(touch.clientX, touch.clientY);
        }
    });
    
    imageContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();
        if (e.touches.length === 1) {
            const touch = e.touches[0];
            drag(touch.clientX, touch.clientY);
        }
    });
    
    imageContainer.addEventListener('touchend', function(e) {
        e.preventDefault();
        endDrag();
    });
    
    // Initialize with centered position
    centerImage();
}

// Initialize image interactions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait for image to load
    setTimeout(initializeImageInteractions, 500);
    // Initialize popup gallery
    setTimeout(initializePopupGallery, 500);
});

// Also initialize when slide changes
Reveal.on('slidechanged', function(event) {
    if (event.currentSlide.querySelector('#imageContainer')) {
        setTimeout(initializeImageInteractions, 100);
    }
    if (event.currentSlide.querySelector('.popup-gallery')) {
        setTimeout(initializePopupGallery, 100);
    }
});

// Image Modal Popup Functionality
function createImageModal(imageSrc, caption) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.9); display: flex; align-items: center;
        justify-content: center; z-index: 9999; cursor: pointer;
        animation: fadeIn 0.3s ease;
    `;
    
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.cssText = `
        max-width: 90%; max-height: 90%; object-fit: contain;
        border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        transition: transform 0.3s ease;
    `;
    
    // Add caption if provided
    if (caption) {
        const captionDiv = document.createElement('div');
        captionDiv.textContent = caption;
        captionDiv.style.cssText = `
            position: absolute; bottom: 30px; left: 50%; transform: translateX(-50%);
            color: white; font-size: 18px; text-align: center;
            background: rgba(0,0,0,0.7); padding: 10px 20px; border-radius: 5px;
        `;
        modal.appendChild(captionDiv);
    }
    
    // Close button
    const closeBtn = document.createElement('div');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
        position: absolute; top: 20px; right: 30px; color: white;
        font-size: 40px; cursor: pointer; z-index: 10000;
        transition: color 0.3s ease;
    `;
    closeBtn.onmouseover = () => closeBtn.style.color = '#ccc';
    closeBtn.onmouseout = () => closeBtn.style.color = 'white';
    
    modal.appendChild(img);
    modal.appendChild(closeBtn);
    
    // Close modal when clicking anywhere or close button
    modal.onclick = () => modal.remove();
    closeBtn.onclick = () => modal.remove();
    
    // Prevent image click from closing modal
    img.onclick = (e) => e.stopPropagation();
    
    document.body.appendChild(modal);
    
    // Add fade-in animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    if (!document.querySelector('style[data-modal-styles]')) {
        style.setAttribute('data-modal-styles', 'true');
        document.head.appendChild(style);
    }
}

// Initialize popup gallery functionality
function initializePopupGallery() {
    const galleryImages = document.querySelectorAll('.popup-gallery img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            const caption = this.getAttribute('alt') || this.getAttribute('data-caption');
            createImageModal(this.src, caption);
        });
        
        // Add hover effect
        img.style.cursor = 'pointer';
        img.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        });
    });
}

// ==========================================================================
// Food System Diagram Navigation
// ==========================================================================

function navigateToSlide(slideId) {
    // Find the slide by ID
    const targetSlide = document.getElementById(slideId);
    if (targetSlide) {
        // Get the indices of the target slide
        const indices = Reveal.getIndices(targetSlide);
        // Navigate to the slide
        Reveal.slide(indices.h, indices.v);
    } else if (slideId === 'food-system-diagram') {
        // Navigate back to the food system diagram slide
        // Find the section containing the food system diagram
        const sections = document.querySelectorAll('section');
        let targetIndex = -1;
        
        sections.forEach((section, index) => {
            if (section.querySelector('.food-system-diagram')) {
                targetIndex = index;
            }
        });
        
        if (targetIndex !== -1) {
            // Navigate to the parent section and then to the specific slide
            const parentSection = sections[targetIndex].closest('section');
            if (parentSection) {
                const indices = Reveal.getIndices(parentSection);
                // Navigate to the food system diagram slide (first sub-slide of Part 2)
                Reveal.slide(indices.h, 1); // Assuming it's the second slide in Part 2
            }
        }
    }
}

// Add event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to flow stages
    const flowStages = document.querySelectorAll('.flow-stage');
    flowStages.forEach(stage => {
        stage.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
        });
    });
    
    // Add click event listeners to back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                eval(onclick);
            }
        });
    });
});

// Alternative navigation method using slide numbers
function navigateToSlideByNumber(slideNumber, subSlideNumber = 0) {
    Reveal.slide(slideNumber, subSlideNumber);
}

// Keyboard shortcuts for food system navigation
document.addEventListener('keydown', function(event) {
    // Press 'B' to go back to food system diagram from detail slides
    if (event.key === 'b' || event.key === 'B') {
        const currentSlide = Reveal.getCurrentSlide();
        if (currentSlide && currentSlide.classList.contains('detail-slide')) {
            navigateToSlide('food-system-diagram');
        }
    }
});
