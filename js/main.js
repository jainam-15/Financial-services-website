// Scroll Animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in on scroll
  const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  // Counter Animation
  const counters = document.querySelectorAll('.stat-number');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const count = parseInt(target.dataset.count);
        const suffix = target.dataset.suffix || '';
        let current = 0;
        const increment = Math.ceil(count / 50);

        const timer = setInterval(() => {
          current += increment;
          if (current >= count) {
            target.textContent = count + suffix;
            clearInterval(timer);
          } else {
            target.textContent = current + suffix;
          }
        }, 30);

        counterObserver.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // Mobile Nav Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile nav on link click
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Theme Toggle Functionality
  const themeToggle = document.getElementById('themeToggle');

  // Check for saved theme preference or default to system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
      document.documentElement.classList.remove('dark-theme');
    } else {
      document.documentElement.classList.add('dark-theme');
      document.documentElement.classList.remove('light-theme');
    }
  };

  // Initialize theme
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Theme toggle click handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isLight = document.documentElement.classList.contains('light-theme');
      const newTheme = isLight ? 'dark' : 'light';

      applyTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'light' : 'dark');
    }
  });
});

// Google Forms submission handler
function handleFormSubmit() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  // Check if form is valid before allowing submission
  if (!form.checkValidity()) {
    // Show validation errors and prevent submission
    form.reportValidity();
    return false;
  }

  // Show success message after a short delay (to allow form submission)
  setTimeout(() => {
    form.style.display = 'none';
    successMessage.style.display = 'block';
  }, 500);

  return true;
}

// Reset form to send another message
function resetForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  form.reset();
  form.style.display = 'block';
  successMessage.style.display = 'none';
}
