// Mobile Menu Functionality
function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    
    mobileMenu.classList.toggle('mobile-menu_open');
    
    if (mobileMenu.classList.contains('mobile-menu_open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}