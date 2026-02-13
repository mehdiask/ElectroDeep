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
    window.location.href = 'https://www.electrodev.com/';
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
