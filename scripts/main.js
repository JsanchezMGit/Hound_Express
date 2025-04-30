document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.header__hamburger');
    const navMenu = document.querySelector('.header__nav');
    
    hamburgerBtn.addEventListener('click', function() {
        this.classList.toggle('header__nav--active');
        navMenu.classList.toggle('header__nav--active');
        
        if (navMenu.classList.contains('header__nav--active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    const navLinks = document.querySelectorAll('.header__nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.classList.remove('header__nav--active');
            navMenu.classList.remove('header__nav--active');
            document.body.style.overflow = '';
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !hamburgerBtn.contains(e.target)) {
            hamburgerBtn.classList.remove('header__nav--active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});