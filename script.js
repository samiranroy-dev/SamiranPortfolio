// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});

// Fade-in effect for sections
const sections = document.querySelectorAll('section');
const options = {
  root: null,
  threshold: 0.1,
  rootMargin: "-100px"
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
      if (!entry.isIntersecting) {
          entry.target.classList.add('fade-in');
      } else {
          entry.target.classList.remove('fade-in');
          // Add a small delay before fully fading in
          setTimeout(() => {
              entry.target.style.opacity = 1;
          }, 50);
      }
  });
}, options);

sections.forEach(section => {
  observer.observe(section);
});

// Hamburger menu functionality
function hamburg() {
  const navbar = document.querySelector(".dropdown")
  navbar.style.transform = "translateY(0px)"
}

function cancel() {
  const navbar = document.querySelector(".dropdown")
  navbar.style.transform = "translateY(-500px)"
}

// Typewriter Effect
const texts = [
  "DEVELOPER",
  "DESIGNER",
];

let speed = 100;
const textElements = document.querySelector(".typewriter-text");

let textIndex = 0;
let characterIndex = 0;

function typeWriter() {
  if (characterIndex < texts[textIndex].length) {
      textElements.innerHTML += texts[textIndex].charAt(characterIndex);
      characterIndex++;
      setTimeout(typeWriter, speed); 
  }
  else {
      setTimeout(eraseText, 1000)
  }
}

function eraseText() {
  if(textElements.innerHTML.length > 0) {
      textElements.innerHTML = textElements.innerHTML.slice(0,-1);
      setTimeout(eraseText, 50)
  }
  else {
      textIndex = (textIndex + 1) % texts.length;
      characterIndex = 0;
      setTimeout(typeWriter, 500)
  }
}

window.onload = typeWriter

// Contact Form Handling
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const formData = new FormData(this);
  const formValues = Object.fromEntries(formData.entries());
  
  // Log form submission (replace with your actual form handling logic)
  console.log('Form submitted:', formValues);
  
  // Show a confirmation message
  const confirmationMessage = document.createElement('div');
  confirmationMessage.classList.add('confirmation-message');
  confirmationMessage.textContent = 'Message sent successfully!';
  
  // Append the message to the form and clear it after a few seconds
  this.appendChild(confirmationMessage);
  setTimeout(() => confirmationMessage.remove(), 3000);
  
  // Clear form
  this.reset();
});

// Add styling for the confirmation message
const style = document.createElement('style');
style.textContent = `
  .confirmation-message {
    margin-top: 10px;
    padding: 10px;
    background-color: #4CAF50;
    color: white;
    border-radius: 5px;
    font-size: 0.9rem;
    text-align: center;
  }
`;
document.head.appendChild(style);
// Contact Form Handling
document.getElementById('contact-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = new FormData(this);
  
  fetch('contact.php', {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      const responseElement = document.getElementById('form-response');
      if (data.success) {
          responseElement.innerHTML = `<div class="success-message">${data.message}</div>`;
          this.reset();
      } else {
          let errorMessage = data.message;
          if (data.errors) {
              errorMessage += '<ul>' + data.errors.map(error => `<li>${error}</li>`).join('') + '</ul>';
          }
          responseElement.innerHTML = `<div class="error-message">${errorMessage}</div>`;
      }
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('form-response').innerHTML = '<div class="error-message">An error occurred. Please try again later.</div>';
  });
});
