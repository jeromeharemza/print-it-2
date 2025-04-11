const slides = [
	{
		"image":"slide1.jpg",
		"tagLine":"Impressions tous formats <span>en boutique et en ligne</span>"
	},
	{
		"image":"slide2.jpg",
		"tagLine":"Tirages haute définition grand format <span>pour vos bureaux et events</span>"
	},
	{
		"image":"slide3.jpg",
		"tagLine":"Grand choix de couleurs <span>de CMJN aux pantones</span>"
	},
	{
		"image":"slide4.png",
		"tagLine":"Autocollants <span>avec découpe laser sur mesure</span>"
	}
]

let currentSlide = 0;
let isTransitioning = false;

const bannerImg = document.querySelector('.banner-img');
const bannerText = document.querySelector('#banner p');
const dotsContainer = document.querySelector('.dots');

// Création des dots
function createDots() {
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('dot_selected');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('dot_selected', index === currentSlide);
    });
}

function goToSlide(index) {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide = index;
    updateSlide();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
}


function updateSlide() {
    bannerImg.src = `./assets/images/slideshow/${slides[currentSlide].image}`;
    bannerText.innerHTML = slides[currentSlide].tagLine;
    updateDots();
}

// Gestion des boutons Précédent / Suivant
document.getElementById('prev-btn').addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide = (currentSlide > 0) ? currentSlide - 1 : slides.length - 1;
    updateSlide();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;

    currentSlide = (currentSlide < slides.length - 1) ? currentSlide + 1 : 0;
    updateSlide();

    setTimeout(() => {
        isTransitioning = false;
    }, 500);
});

// Lancer les dots et affichage initial
createDots();
updateSlide();


setInterval(() => {
    document.getElementById('next-btn').click();
}, 5000);
