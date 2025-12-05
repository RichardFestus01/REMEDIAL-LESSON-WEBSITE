document.addEventListener('DOMContentLoaded', function() {
    // --- Accordion Logic for Subject Cards ---

    const subjectCards = document.querySelectorAll('.subject-card');

    subjectCards.forEach(card => {
        const header = card.querySelector('.subject-header');
        const icon = card.querySelector('.toggle-icon');

        header.addEventListener('click', () => {
            // Toggle the 'active' class on the clicked card
            card.classList.toggle('active');

            // Change the icon based on the active state
            icon.textContent = card.classList.contains('active') ? '−' : '+';
        });
    });

    // --- Scroll Animation Logic ---

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the element is in view, add the 'visible-section' class
                entry.target.classList.add('visible-section');
                // Optional: Stop observing the element after it has become visible
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Select all elements with the 'hidden-section' class and observe them
    const hiddenElements = document.querySelectorAll('.hidden-section');
    hiddenElements.forEach(el => observer.observe(el));

});
