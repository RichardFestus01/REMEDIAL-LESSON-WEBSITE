document.addEventListener('DOMContentLoaded', function() {
    console.log("script.js loaded");

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
});
