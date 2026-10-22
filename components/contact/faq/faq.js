// Contact FAQ Accordion Controller - Matching Web Development & App Development
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.contact-faq-section .faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;

        question.addEventListener('click', function () {
            // Close other items for a clean single-open accordion experience
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});
