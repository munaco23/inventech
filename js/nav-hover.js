document.addEventListener('DOMContentLoaded', function() {
    function initNavHover(){
        const menuItems = document.querySelectorAll('.nav-container-menu-right ul li');
        const menuImage = document.getElementById('menu-hover-img');
        if (!menuItems.length || !menuImage) return; // wait until header exists
        let isHovered = false;
        let activeTimeout;
    
    // Set home image as default
    const homeItem = document.querySelector('.nav-container-menu-right ul li[data-image*="home"]');
    if (homeItem && menuImage) {
        const homeImage = homeItem.getAttribute('data-image');
        menuImage.src = homeImage;
    }

    // Function to change the image
    function changeImage(imageSrc) {
        if (!imageSrc) return;
        
        // Fade out current image
        menuImage.classList.add('fade-out');
        
        // After fade out, change the image and fade in
        setTimeout(() => {
            menuImage.src = imageSrc;
            menuImage.alt = 'Menu Hover Image';
            menuImage.classList.remove('fade-out');
        }, 300); // Match this with the CSS transition time
    }

    // Add hover event listeners to menu items
    menuItems.forEach(item => {
        const imageSrc = item.getAttribute('data-image');
        const link = item.querySelector('a');
        
        if (imageSrc) {
            // Preload the image
            const img = new Image();
            img.src = imageSrc;
            
            // Mouse enter event
            item.addEventListener('mouseenter', () => {
                isHovered = true;
                clearTimeout(activeTimeout);
                changeImage(imageSrc);
            });
            
            // Mouse leave event
            item.addEventListener('mouseleave', () => {
                isHovered = false;
                // Immediately change to home image when leaving any menu item
                const homeImage = document.querySelector('.nav-container-menu-right ul li[data-image*="home"]')?.getAttribute('data-image');
                if (homeImage) {
                    clearTimeout(activeTimeout);
                    changeImage(homeImage);
                }
            });
            
            // Keep the image when clicking on the link
            link.addEventListener('click', (e) => {
                e.preventDefault();
                changeImage(imageSrc);
                // Navigate to the link after a short delay
                setTimeout(() => {
                    window.location.href = link.getAttribute('href');
                }, 100);
            });
        }
    });

    // Add event listeners to the menu container to handle mouse leave
    const menuContainer = document.querySelector('.nav-container-menu');
    if (menuContainer) {
        menuContainer.addEventListener('mouseleave', () => {
            isHovered = false;
            const homeImage = document.querySelector('.nav-container-menu-right ul li[data-image*="home"]')?.getAttribute('data-image');
            if (homeImage) {
                activeTimeout = setTimeout(() => {
                    changeImage(homeImage);
                }, 300);
            }
        });
    }
    }
    // try now and also when header loads
    initNavHover();
    document.addEventListener('header:loaded', initNavHover);
});
