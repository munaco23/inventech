/**
 * About Page - Team Component Script (Auto Horizontal Smooth Scroll & Interactive Controls)
 * Path: components/about/team/team.js
 */

document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.about-team-carousel-wrapper');
    const track = document.querySelector('.about-team-track');
    if (!wrapper || !track) return;

    // Pause animation during touch on mobile so users can comfortably view cards
    wrapper.addEventListener('touchstart', function () {
        wrapper.classList.add('is-paused');
    }, { passive: true });

    wrapper.addEventListener('touchend', function () {
        wrapper.classList.remove('is-paused');
    }, { passive: true });

    // Handle extra wide monitors (e.g. 4K displays) so the infinite loop never runs out of cards
    function ensureTrackCoverage() {
        const firstGroup = track.querySelector('.about-team-group');
        if (!firstGroup) return;

        if (track.scrollWidth < window.innerWidth * 2.5) {
            const clone = firstGroup.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            track.appendChild(clone);
        }
    }

    ensureTrackCoverage();
    window.addEventListener('resize', ensureTrackCoverage, { passive: true });
});
