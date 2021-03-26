const btn = document.querySelector('.btn');
const navbar = document.querySelector('.navbar');

function buttonAnimation() {
    btn.classList.toggle('btn-animation');
}

function openMenu() {
    navbar.classList.toggle('open');
}

btn.addEventListener('click', buttonAnimation);
btn.addEventListener('click', openMenu);

window.addEventListener('resize', () => {
    if (window.innerWidth >= 576 && navbar.classList.contains('open')) {
        navbar.classList.remove('open');
        btn.classList.remove('btn-animation');
    }
})