// ===============================================
// 🔹 SCROLL FADE-IN (pentru secțiunile vizibile la scroll)
// ===============================================
const sectionsToReveal = document.querySelectorAll('.fade-section:not(.about):not(.exercises):not(.team)');

function revealSections() {
  const triggerBottom = window.innerHeight * 0.8;
  sectionsToReveal.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      sec.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSections);
revealSections();


// ===============================================
// 🔹 FUNCȚII COMUNE pentru toate secțiunile
// ===============================================
function showSection(section) {
  section.style.display = 'block';
  setTimeout(() => section.classList.add('visible'), 10);
  section.scrollIntoView({ behavior: 'smooth' });
}

function hideSection(section) {
  section.classList.remove('visible');
  setTimeout(() => {
    section.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 800);
}


// ===============================================
// 🔹 ABOUT SECTION
// ===============================================
const aboutSection = document.querySelector('.about');
const exploreBtn = document.getElementById('exploreBtn');

// Buton de închidere
const closeAboutBtn = document.createElement('button');
closeAboutBtn.textContent = 'Închide secțiunea';
closeAboutBtn.className = 'close-about';
aboutSection.appendChild(closeAboutBtn);

exploreBtn.addEventListener('click', () => {
  if (!aboutSection.classList.contains('visible')) {
    showSection(aboutSection);
  }
});

closeAboutBtn.addEventListener('click', () => hideSection(aboutSection));


// ===============================================
// 🔹 EXERCISE SECTION
// ===============================================
const exerciseSection = document.querySelector('.exercises');
const exerciseBtn = document.getElementById('exerciseBtn');
const closeExercisesBtn = document.querySelector('.close-exercises');

exerciseBtn.addEventListener('click', () => {
  if (!exerciseSection.classList.contains('visible')) {
    showSection(exerciseSection);
  }
});

closeExercisesBtn.addEventListener('click', () => hideSection(exerciseSection));


// ===============================================
// 🔹 TEAM SECTION (comportament identic)
// ===============================================
const teamSection = document.querySelector('.team.fade-section');
const teamBtn = document.getElementById('teamBtn');

// Creăm butonul de închidere doar dacă nu există deja
let closeTeamBtn = teamSection.querySelector('.close-team');
if (!closeTeamBtn) {
  closeTeamBtn = document.createElement('button');
  closeTeamBtn.textContent = 'Închide secțiunea';
  closeTeamBtn.className = 'close-team';
  teamSection.appendChild(closeTeamBtn);
}

// Deschidere secțiune ECHIPA
teamBtn.addEventListener('click', () => {
  if (!teamSection.classList.contains('visible')) {
    showSection(teamSection);
  }
});

// Închidere secțiune ECHIPA
closeTeamBtn.addEventListener('click', () => hideSection(teamSection));


function portalAnimation(callback) {
  const portal = document.createElement('div');
  portal.classList.add('portal-effect');
  document.body.appendChild(portal);

  setTimeout(() => {
    portal.remove();
    if (callback) callback();
  }, 1000);
}

// Pentru butonul de apel
document.querySelector('.float-btn.phone')?.addEventListener('click', (e) => {
  e.preventDefault();
  portalAnimation(() => {
    window.location.href = "tel:+40771083833";
  });
});

// Pentru butonul WhatsApp
document.querySelector('.float-btn.whatsapp')?.addEventListener('click', (e) => {
  e.preventDefault();
  portalAnimation(() => {
    window.open("https://wa.me/40771083833", "_blank");
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('header.hero');
  const body = document.body;

  // Blocăm scroll-ul la încărcare
  body.classList.add('hero-active');

  // La click pe oricare buton din hero
  const heroButtons = hero.querySelectorAll('button');
  heroButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Deblocăm scroll-ul și facem hero relativ
      body.classList.remove('hero-active');
      hero.style.position = 'relative';
    });
  });
});



//Matei
