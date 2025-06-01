document.addEventListener('DOMContentLoaded', () => {

    const navbar = document.getElementById('navbar');


    const handleScroll = () => {
 
        if (window.scrollY > 50) {

            navbar.classList.add('scrolled-nav');
        } else {

            navbar.classList.remove('scrolled-nav');
        }
    };

    window.addEventListener('scroll', handleScroll);


    handleScroll();

    // Select all navigation links
    const navLinks = document.querySelectorAll('.nav-link');


    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {

            console.log(`Hovered over: ${link.textContent}`);
        });

        link.addEventListener('mouseleave', () => {
            console.log(`Left: ${link.textContent}`);
        });
    });


    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {

            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
