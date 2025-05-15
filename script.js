// Tab Switching Functionality
function initTabSwitching() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  function setActiveTab(tabId) {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected button and content
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
  }
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      setActiveTab(tabId);
    });
  });
  
  // Set initial active tab
  setActiveTab('skills');
}

// Rest of your JavaScript remains the same
// Make sure to call initTabSwitching() in your DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initTabSwitching();
  initSmoothScrolling();
  initScrollAnimation();
  initContactForm();
  
  // Start typewriter effect when page loads
  window.addEventListener('load', startTypewriter);
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (document.querySelector('.dropdown').classList.contains('active')) {
        toggleMenu();
      }
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 60,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Scroll Animation for sections
function initScrollAnimation() {
  const sections = document.querySelectorAll('.section');
  const animatedElements = document.querySelectorAll('.skill-progress, .service-card, .timeline-item, .project-item');
  
  const options = {
    root: null,
    threshold: 0.1,
    rootMargin: "-100px"
  };
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in');
        entry.target.classList.remove('fade-in');
        sectionObserver.unobserve(entry.target);
      }
    });
  }, options);
  
  const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add a small delay for staggered animation
        setTimeout(() => {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        elementObserver.unobserve(entry.target);
      }
    });
  }, options);
  
  sections.forEach(section => {
    section.classList.add('fade-in');
    sectionObserver.observe(section);
  });
  
  animatedElements.forEach((element, index) => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.1}s`;
    elementObserver.observe(element);
  });
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 100) {
      nav.style.background = 'rgba(0, 0, 0, 0.95)';
      nav.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    } else {
      nav.style.background = 'rgba(0, 0, 0, 0.9)';
      nav.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
  });
}

// Hamburger menu functionality
function toggleMenu() {
  const dropdown = document.querySelector('.dropdown');
  dropdown.classList.toggle('active');
  
  // Prevent scrolling when menu is open
  if (dropdown.classList.contains('active')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

// Make toggleMenu available globally
window.toggleMenu = toggleMenu;

// Typewriter Effect
function startTypewriter() {
  const texts = [
    "DEVELOPER",
    "DESIGNER",
    "CREATOR"
  ];
  
  let speed = 100;
  const textElement = document.querySelector(".typewriter-text");
  
  let textIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;
  let isWaiting = false;
  
  function typeWriter() {
    const currentText = texts[textIndex];
    
    if (isWaiting) {
      setTimeout(() => {
        isWaiting = false;
        isDeleting = true;
        typeWriter();
      }, 1500);
      return;
    }
    
    if (isDeleting) {
      // Erasing text
      textElement.textContent = currentText.substring(0, characterIndex - 1);
      characterIndex--;
      speed = 50;
      
      if (characterIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500; // Pause before typing next word
      }
    } else {
      // Typing text
      textElement.textContent = currentText.substring(0, characterIndex + 1);
      characterIndex++;
      speed = 100;
      
      if (characterIndex === currentText.length) {
        isWaiting = true;
      }
    }
    
    setTimeout(typeWriter, speed);
  }
  
  // Start the typewriter effect
  typeWriter();
}

// Contact Form Handling
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const formData = new FormData(this);
      const formValues = Object.fromEntries(formData.entries());
      
      // Simulate form submission with a loading state
      const submitButton = this.querySelector('.submit-button');
      const originalButtonText = submitButton.innerHTML;
      submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;
      
      // Simulate API call with setTimeout
      setTimeout(() => {
        // Log form submission (replace with your actual form handling logic)
        console.log('Form submitted:', formValues);
        
        // Show a confirmation message
        const responseElement = document.getElementById('form-response');
        responseElement.innerHTML = `
          <div class="success-message">
            <i class="fas fa-check-circle"></i> Message sent successfully! I'll get back to you soon.
          </div>
        `;
        
        // Reset form and button
        contactForm.reset();
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
        
        // Clear message after 5 seconds
        setTimeout(() => {
          responseElement.innerHTML = '';
        }, 5000);
      }, 1500);
    });
  }
  
  // Add download CV functionality
  const downloadButton = document.querySelector('.download-cv');
  if (downloadButton) {
    downloadButton.addEventListener('click', function() {
      // This would normally trigger a download
      // For demo purposes, we'll just show an alert
      alert('CV download would start now. Replace with actual download link.');
    });
  }
}

// Service card hover effects
document.addEventListener('DOMContentLoaded', function() {
  const serviceCards = document.querySelectorAll('.service-card');
  
  serviceCards.forEach(card => {
    const color = card.getAttribute('data-color');
    card.style.backgroundColor = color;
    
    card.addEventListener('mouseenter', function() {
      this.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      this.style.borderLeft = `5px solid ${color}`;
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.backgroundColor = color;
      this.style.borderLeft = 'none';
    });
  });
});
