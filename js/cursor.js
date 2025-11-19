// document.addEventListener('DOMContentLoaded', function() {
//     const cursor = document.createElement('div');
//     cursor.classList.add('cursor');
//     document.body.appendChild(cursor);

//     // Only activate custom cursor inside nav container
//     const navContainer = document.querySelector('.nav-container-menu');
    
//     // Update cursor position
//     document.addEventListener('mousemove', (e) => {
//         cursor.style.left = e.clientX + 'px';
//         cursor.style.top = e.clientY + 'px';
        
//         // Check if cursor is inside nav container
//         const isInNav = e.target.closest('.nav-container-menu') !== null;
        
//         if (isInNav) {
//             cursor.style.display = 'block';
//             document.body.style.cursor = 'none';
//         } else {
//             cursor.style.display = 'none';
//             document.body.style.cursor = 'auto';
//         }
//     });

//     // Add hover effect on navigation links only
//     const navLinks = document.querySelectorAll('.nav-container-menu a, .nav-container-menu li');
//     navLinks.forEach(link => {
//         link.style.cursor = 'none'; // Hide default cursor
        
//         link.addEventListener('mouseenter', () => {
//             cursor.classList.add('hovered');
//         });
//         link.addEventListener('mouseleave', () => {
//             cursor.classList.remove('hovered');
//         });
//     });

//     // Add click effect only in nav
//     navContainer.addEventListener('mousedown', () => {
//         cursor.classList.add('clicked');
//     });
//     navContainer.addEventListener('mouseup', () => {
//         cursor.classList.remove('clicked');
//     });
// });
