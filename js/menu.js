

document.addEventListener('DOMContentLoaded', function() {
    let initialized = false;

    const initMenu = () => {
        if (initialized) return;

        // Menu elements (exist only after header is injected)
        const humburger = document.querySelector('.humburger');
        const humburger1 = document.querySelector('.humburger1');
        const humburger2 = document.querySelector('.humburger2');
        const navMenu = document.querySelector('.nav-container-menu');
        if (!humburger || !humburger1 || !humburger2 || !navMenu) return; // wait until header present

        initialized = true;
        let flage = false;

        // Simple cursor trail
        const initCursor = () => {
            const menu = document.querySelector('.nav-container-menu');
            if (!menu) return; // Exit if menu not found

            const cursor = document.createElement('div');
            cursor.className = 'cursor-trail';
            document.body.appendChild(cursor);

            // Hide default cursor in menu
            menu.style.cursor = 'none';

            // Track mouse movement
            menu.addEventListener('mousemove', (e) => {
                cursor.style.left = e.clientX + 'px';
                cursor.style.top = e.clientY + 'px';
                cursor.style.opacity = '1';
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            });

            // Hide cursor when leaving menu
            menu.addEventListener('mouseleave', () => {
                cursor.style.opacity = '0';
                cursor.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });

            // Add hover effect for menu items
            const links = menu.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('mouseenter', () => {
                    cursor.style.width = '50px';
                    cursor.style.height = '50px';
                    cursor.style.backgroundColor = 'rgba(47, 213, 199, 0.2)';
                    cursor.style.border = '2px solid var(--primary-color)';
                });
                
                link.addEventListener('mouseleave', () => {
                    cursor.style.width = '20px';
                    cursor.style.height = '20px';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.border = '2px solid var(--primary-color)';
                });
            });
        };

        // Initialize cursor
        initCursor();

        // Toggle submenu open/close on click for overlay menu
        const serviceItem = document.querySelector('.nav-container-menu-right li.has-submenu > a');
        if (serviceItem) {
            serviceItem.addEventListener('click', (e) => {
                e.preventDefault();
                const parentLi = serviceItem.parentElement;
                parentLi.classList.toggle('open');
            });
        }

        // Function to close menu
        const closeMenu = () => {
            flage = false;
            navMenu.style.transform = 'translateY(-120%)';
            humburger1.style.transform = '';
            humburger2.style.transform = '';
            document.body.style.overflow = '';
        };

        // Toggle menu
        humburger.addEventListener('click', () => {
            flage = !flage;
            if (!flage) {
                closeMenu();
            } else {
                navMenu.style.transform = 'translateY(0)';
                humburger1.style.transform = 'rotate(45deg) translateY(8px)';
                humburger2.style.transform = 'rotate(-45deg) translateY(-6px) translateX(-2px)';
                document.body.style.overflow = 'hidden';
            }
        });

        // Close menu when clicking on in-page hash links, but NOT the submenu toggle
        const navLinks = document.querySelectorAll('.nav-container-menu-right ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // skip the Services dropdown toggle
                if (link.classList.contains('submenu-toggle')) return;
                const href = link.getAttribute('href') || '';
                if (href.startsWith('#')) {
                    closeMenu();
                }
            });
        });
    };

    // Try to init now (in case header is already present)
    initMenu();
    // Also wait for header injection event
    document.addEventListener('header:loaded', initMenu, { once: true });
});