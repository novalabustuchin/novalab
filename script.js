// ============================================================
//           SCRIPT PENTRU NAVIGARE, SWIPE ȘI "CITEȘTE MAI MULT"
// ============================================================

// selectăm containerul principal cu toate paginile
const pages = document.getElementById('pages');

// selectăm fiecare pagină individual
const pageEls = Array.from(document.querySelectorAll('.page'));

// selectăm butoanele de navigare Prev/Next
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// selectăm link-urile din navbar
const navLinks = document.getElementById('navLinks');

// selectăm containerul pentru punctele de navigare (dots)
const dotsWrap = document.getElementById('dots');

// selectăm butonul burger pentru mobil
const burger = document.getElementById('burger');

// indexul paginii curente (0 = prima pagină)
let index = 0;

// -------------------- CREAM DOTS --------------------
// pentru fiecare pagină, creăm un punct de navigare vizual
pageEls.forEach((p, i) => {
  const d = document.createElement('div'); 
  d.className = 'dot' + (i === 0 ? ' active' : ''); // primul punct e activ la start
  dotsWrap.appendChild(d); // adăugăm punctul în container
});

// -------------------- FUNCȚIA DE UPDATE --------------------
// actualizează poziția paginii, activarea link-urilor și punctelor
function update() {
  // mutăm containerul .pages în funcție de index
  pages.style.transform = `translateX(${-index * 100}%)`;

  // activăm link-ul corespunzător în navbar
  document.querySelectorAll('.nav-links a').forEach(a => 
    a.classList.toggle('active', +a.dataset.index === index)
  );

  // activăm punctul corespunzător
  document.querySelectorAll('.dot').forEach((d, i) => 
    d.classList.toggle('active', i === index)
  );
}

// -------------------- BUTOANE PREV / NEXT --------------------
prevBtn.addEventListener('click', () => {
  index = Math.max(0, index - 1); // nu scădem sub 0
  update();
});
nextBtn.addEventListener('click', () => {
  index = Math.min(pageEls.length - 1, index + 1); // nu depășim ultima pagină
  update();
});

// -------------------- NAVBAR LINKS --------------------
navLinks.addEventListener('click', (e) => {
  const a = e.target.closest('a'); // aflăm link-ul pe care s-a dat click
  if (!a) return; // dacă nu e link, ieșim
  index = Number(a.dataset.index); // luăm indexul paginii din atribut
  update(); // actualizăm pagina și punctele
});

// -------------------- BURGER MENU (mobil) --------------------

const links = document.getElementById('navLinks');

burger.addEventListener('click', (e) => {
  // prevenim ca click-ul pe burger să "propagheze" și să închidă imediat meniul
  e.stopPropagation();
  // alternăm clasa 'open' pentru a arăta sau ascunde meniul
  links.classList.toggle('open');
});

// dacă se face click oriunde în document
document.addEventListener('click', () => {
  // verificăm dacă meniul este deschis
  if (links.classList.contains('open')) {
    links.classList.remove('open'); // îl închidem
  }
});

// prevenim ca click-ul pe link-uri să închidă meniul imediat
links.addEventListener('click', (e) => {
  e.stopPropagation();
});


// -------------------- TOGGLE "CITEȘTE MAI MULT" --------------------
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();  // prevenim comportamente nedorite (ex: submit)
    e.stopPropagation(); // împiedicăm propagarea click-ului

    // căutăm containerul .content pentru a găsi paragraful
    const content = btn.closest('.content');
    if (!content) return;

    const p = content.querySelector('.desc'); // paragraful ascuns/expandabil
    if (!p) return;

    // alternăm clasa 'expanded' pentru a arăta/ascunde tot textul
    p.classList.toggle('expanded');

    // actualizăm textul butonului și atributul pentru accesibilitate
    const expanded = p.classList.contains('expanded');
    btn.textContent = expanded ? 'Arată mai puțin' : 'Citește mai mult';
    btn.setAttribute('aria-expanded', expanded);
  });
});

// -------------------- TOUCH / SWIPE PENTRU MOBIL --------------------
let startX = 0, currentX = 0, dragging = false;

pages.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // punctul de start al degetului
  dragging = true;               // începem drag-ul
  pages.style.transition = 'none'; // dezactivăm tranziția temporar
});

pages.addEventListener('touchmove', (e) => {
  if (!dragging) return;
  currentX = e.touches[0].clientX;
  const dx = currentX - startX;
  pages.style.transform = `translateX(${-index * 100 + (dx / pages.clientWidth) * 100}%)`;
});

pages.addEventListener('touchend', (e) => {
  dragging = false;
  pages.style.transition = 'transform 320ms ease';
  const dx = currentX - startX;
  if (dx > 60) {
    index = Math.max(0, index - 1); // swipe dreapta
  } else if (dx < -60) {
    index = Math.min(pageEls.length - 1, index + 1); // swipe stânga
  }
  currentX = 0;
  update();
});

// -------------------- NAVIGARE CU TASTATURA --------------------
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'ArrowRight') nextBtn.click();
});

// -------------------- REZIZE --------------------
window.addEventListener('resize', () => {
  if (window.innerWidth > 800) {
    document.getElementById('navLinks').style.display = 'flex'; // arătăm navbar pe desktop
  }
});

// -------------------- START --------------------
update(); // afișăm pagina inițială și activăm primul dot
