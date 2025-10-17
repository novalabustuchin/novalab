// ===============================================
// 🔹 SCROLL FADE-IN (pentru secțiunile vizibile la scroll)
// ===============================================
const sections = document.querySelectorAll('.fade-section:not(.about):not(.exercises)');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.8;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      sec.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
revealSections();


// ===============================================
// 🔹 ABOUT SECTION - apare doar când este apelată
// ===============================================
const aboutSection = document.querySelector('.about');
const exploreBtn = document.getElementById('exploreBtn');

// Creăm butonul de închidere o singură dată
const closeAboutBtn = document.createElement('button');
closeAboutBtn.textContent = 'Închide secțiunea';
closeAboutBtn.className = 'close-about';
aboutSection.appendChild(closeAboutBtn);

// Funcție comună de afișare cu animație
function showSection(section) {
  section.style.display = 'block';
  setTimeout(() => section.classList.add('visible'), 10);
  section.scrollIntoView({ behavior: 'smooth' });
}

// Funcție comună de închidere cu animație
function hideSection(section) {
  section.classList.remove('visible');
  setTimeout(() => {
    section.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 800);
}

// Deschidere secțiune ABOUT
exploreBtn.addEventListener('click', () => {
  if (!aboutSection.classList.contains('visible')) {
    showSection(aboutSection);
  }
});

// Închidere secțiune ABOUT
closeAboutBtn.addEventListener('click', () => hideSection(aboutSection));


// ===============================================
// 🔹 EXERCISE SECTION - comportament identic
// ===============================================
const exerciseSection = document.querySelector('.exercises');
const exerciseBtn = document.getElementById('exerciseBtn');
const closeExercisesBtn = document.querySelector('.close-exercises');

// Deschidere secțiune EXERCIȚII
exerciseBtn.addEventListener('click', () => {
  if (!exerciseSection.classList.contains('visible')) {
    showSection(exerciseSection);
  }
});

// Închidere secțiune EXERCIȚII
closeExercisesBtn.addEventListener('click', () => hideSection(exerciseSection));
