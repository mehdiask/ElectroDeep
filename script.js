const toggle = document.getElementById("theme-toggle");
const html = document.documentElement;
const icon = toggle.querySelector(".icon");
const text = toggle.querySelector(".text");

toggle.addEventListener("click", () => {
  const theme = html.getAttribute("data-theme");

  if (theme === "light") {
    html.setAttribute("data-theme", "dark");
    icon.textContent = "☀️";
    text.textContent = "Normal";
  } else {
    html.setAttribute("data-theme", "light");
    icon.textContent = "🌙";
    text.textContent = "Dark";
  }
});


document.querySelector('.home-btn').addEventListener('click', function () {
    window.location.href = 'https://www.electrodeep.com/';
  });


// ===== SECTION FADE-IN ANIMATION =====
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.30 }
);

sections.forEach(section => observer.observe(section));

// ===== BACK TO TOP BUTTON =====
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Existing code (theme toggle, scroll animations, back to top) remains unchanged.
// Add the following:

// ===== CONTACT MODAL =====
const modal = document.getElementById('contactModal');
const contactBtn = document.querySelector('.contactus-btn'); // The button that opens the modal
const closeBtn = document.querySelector('.close-modal');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

// Open modal when Contact Us button is clicked
contactBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent jumping to #contacts
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
});

// Close modal when X is clicked
closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Handle form submission
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Collect form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Simple validation (HTML5 required handles most, but we double-check)
  if (!data.fullname || !data.company || !data.phone || !data.email || !data.subject || !data.comments) {
    formStatus.textContent = 'Please fill all required fields.';
    formStatus.style.color = '#e74c3c';
    return;
  }
  
  // Disable submit button to prevent double submission
  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';
  
  try {
	  
    // ===== REPLACE WITH YOUR ACTUAL FORM ENDPOINT =====
	const response = await fetch('https://getform.io/f/your-unique-id', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(data)
	});
    // For demo, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
    
    // Show success message
    formStatus.textContent = 'Thank you! Your message has been sent.';
    formStatus.style.color = '#2ecc71';
    form.reset(); // Clear the form
    
    // Close modal after 2 seconds (optional)
    setTimeout(() => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      formStatus.textContent = ''; // Clear status
    }, 2000);
    
  } catch (error) {
    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
    formStatus.style.color = '#e74c3c';
    console.error('Submission error:', error);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'SUBMIT';
  }
});
