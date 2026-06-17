/* ================================================================
   PORTFOLIO PERSONAL — main.js
   ================================================================

   ESTRUCTURA DE ESTE ARCHIVO:
   1.  CONFIG — los únicos valores que necesitás cambiar regularmente
   2.  Efecto typewriter (roles en el hero)
   3.  Navbar: scroll y link activo
   4.  Animación de barras de skills
   5.  Fade-in al hacer scroll
   6.  Año dinámico en el footer

================================================================ */

/* ================================================================
   1. CONFIG — cambiá esto para personalizar el comportamiento
   ================================================================ */

const CONFIG = {

  // Roles que se "escriben" en el hero
  // Agregá o quitá strings del array según quieras
  roles: [
    'Full-Stack Developer',
    'Amante del Open Source',
    'Solucionador de problemas',
    'Eterno aprendiz',
  ],

  // Velocidades del efecto typewriter (en milisegundos)
  typeSpeed:   80,   // velocidad al escribir letra por letra
  deleteSpeed: 40,   // velocidad al borrar
  pauseAfter:  2000, // pausa antes de borrar

  // Umbral para activar fade-in de elementos (0 = apenas visible, 1 = completamente visible)
  scrollThreshold: 0.15,
};

/* ================================================================
   2. EFECTO TYPEWRITER — roles que se escriben en el hero
   No hace falta tocar nada acá; editá CONFIG.roles de arriba.
   ================================================================ */

(function initTypewriter() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  let roleIndex = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function type() {
    const currentRole = CONFIG.roles[roleIndex];

    if (isDeleting) {
      // Borrar
      charIndex--;
      el.textContent = currentRole.substring(0, charIndex);
    } else {
      // Escribir
      charIndex++;
      el.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? CONFIG.deleteSpeed : CONFIG.typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      // Terminó de escribir: pausar antes de borrar
      delay = CONFIG.pauseAfter;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Terminó de borrar: pasar al siguiente rol
      isDeleting = false;
      roleIndex = (roleIndex + 1) % CONFIG.roles.length;
    }

    setTimeout(type, delay);
  }

  type();
})();


/* ================================================================
   3. NAVBAR — efecto blur/sombra al hacer scroll + link activo
   ================================================================ */

(function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  // Sombra en la navbar al bajar
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Resaltar el link activo según la sección visible
  const sections = document.querySelectorAll('section[id]');

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(section => observerNav.observe(section));

  // Cerrar el menú mobile al hacer click en un link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const collapse = document.getElementById('navMenu');
      const bsCollapse = bootstrap.Collapse.getInstance(collapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });
})();

/* ================================================================
   4. BARRAS DE SKILLS — se animan al entrar en el viewport
   El nivel se lee del atributo data-level de cada .skill-item
   ================================================================ */

(function initSkillBars() {
  const skillItems = document.querySelectorAll('.skill-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const level = entry.target.getAttribute('data-level') || '0';
          const fill  = entry.target.querySelector('.skill-fill');
          if (fill) {
            fill.style.width = `${level}%`;
          }
          observer.unobserve(entry.target); // solo animar una vez
        }
      });
    },
    { threshold: CONFIG.scrollThreshold }
  );

  skillItems.forEach(item => observer.observe(item));
})();


/* ================================================================
   5. FADE-IN AL HACER SCROLL
   Agrega la clase .fade-in-up a todos los elementos que quieras animar.
   Por defecto aplica a las tarjetas de proyectos, skills y stats.
   Para agregar más elementos: sumalos al selector de abajo.
   ================================================================ */

(function initFadeIn() {
  // Elementos que reciben fade-in al aparecer en pantalla
  const fadeTargets = document.querySelectorAll(
    '.project-card, .skill-category-card, .stat-card, .about-text'
  );

  fadeTargets.forEach(el => el.classList.add('fade-in-up'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: CONFIG.scrollThreshold }
  );

  fadeTargets.forEach(el => observer.observe(el));
})();

/* ================================================================
   6. AÑO DINÁMICO EN EL FOOTER
   Se actualiza solo, no hace falta tocarlo.
   ================================================================ */

(function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* ================================================================
   EXTRA: Listo para agregar más funcionalidades acá abajo.
   Ejemplos:
   - Formulario de contacto con fetch (EmailJS, Formspree, etc.)
   - Filtro de proyectos por tecnología
   - Dark/light mode toggle
   - Partículas en el hero
================================================================ */
