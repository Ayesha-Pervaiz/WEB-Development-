// script.js
document.querySelector('.login-button').addEventListener('click', function() {
    // You can add login functionality here
    alert('Login button clicked');
});
// script.js
const slider = document.querySelector('.slider-container');
let slideIndex = 0;

function nextSlide() {
    if (slideIndex < slider.children.length - 1) {
        slideIndex++;
    } else {
        slideIndex = 0;
    }
    updateSlider();
}

function previousSlide() {
    if (slideIndex > 0) {
        slideIndex--;
    } else {
        slideIndex = slider.children.length - 1;
    }
    updateSlider();
}

function updateSlider() {
    slider.style.transform = `translateX(-${slideIndex * 100}%)`;
}

setInterval(nextSlide, 3000); // Auto slide every 3 seconds
const logo = document.getElementById('logo');
const menu = document.querySelector('.menu-list');

logo.addEventListener('click', toggleMenu);

function toggleMenu() {
    menu.classList.toggle('hidden');
}