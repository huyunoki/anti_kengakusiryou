import './style.css'

// Intersection Observer for Scroll Animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15 // Trigger a bit earlier
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.fade-in-section');
  sections.forEach(section => {
    observer.observe(section);
  });

  setupHeroParallax();
});

// Subtle Parallax / Mouse Move Effect for Hero
function setupHeroParallax() {
  const hero = document.querySelector('#hero');
  const content = hero.querySelector('.content-wrapper');

  if (!hero || !content) return;

  hero.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;

    // Calculate mouse position percentage (-1 to 1)
    const xPos = (clientX / innerWidth - 0.5) * 2;
    const yPos = (clientY / innerHeight - 0.5) * 2;

    // Move content slightly opposite to mouse
    content.style.transform = `translate(${xPos * -10}px, ${yPos * -10}px)`;
  });

  // Reset on mouse leave
  hero.addEventListener('mouseleave', () => {
    content.style.transform = 'translate(0, 0)';
    content.style.transition = 'transform 0.5s ease-out';
    setTimeout(() => {
      content.style.transition = ''; // Remove transition so mousemove is instant
    }, 500);
  });
}
