/**
 * Team Component Script - Auto Horizontal Smooth Scroll
 * Path: components/home/team/team.js
 */

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.team-carousel-wrapper');
    const track = document.querySelector('.team-track');
    if (!wrapper || !track) return;

    // Pause on touch for mobile devices so user can inspect cards
    wrapper.addEventListener('touchstart', function () {
        wrapper.classList.add('is-paused');
    }, { passive: true });

    wrapper.addEventListener('touchend', function () {
        wrapper.classList.remove('is-paused');
    }, { passive: true });

    // Touch support for cards on mobile
    const cards = track.querySelectorAll('.team-member-card');
    cards.forEach(function (card) {
        card.addEventListener('touchstart', function () {
            cards.forEach(function (c) {
                if (c !== card) c.classList.remove('touch-active');
            });
            this.classList.toggle('touch-active');
        }, { passive: true });
    });

    // Ensure seamless track continuity on extra-wide screens (e.g. 4K displays)
    function checkTrackFill() {
        const firstGroup = track.querySelector('.team-group');
        if (!firstGroup) return;

        // If total track width is less than 2.5x the screen width, clone an extra group
        if (track.scrollWidth < window.innerWidth * 2.5) {
            const clone = firstGroup.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        }
    }

    checkTrackFill();
    window.addEventListener('resize', checkTrackFill, { passive: true });
});
