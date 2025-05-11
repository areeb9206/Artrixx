// Wait until DOM content is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");
  const backToTopButton = document.getElementById("backToTop");

  // // Toggle navigation menu on hamburger click (for mobile)
  // hamburger.addEventListener("click", () => {
  //   navLinks.classList.toggle("open");
  // });

  // // Close the navigation menu on scroll and handle back-to-top button visibility
  // window.addEventListener("scroll", () => {
  //   if (navLinks.classList.contains("open")) {
  //     navLinks.classList.remove("open");
  //   }
  //   if (window.scrollY > 300) {
  //     backToTopButton.style.display = "block";
  //   } else {
  //     backToTopButton.style.display = "none";
  //   }
  // });

  // Close nav menu when a link is clicked on mobile devices
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("open");
      }
    });
  });

  // Smooth scroll behavior for navigation links
  document.querySelectorAll("nav a").forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId.startsWith("#")) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // If external link, perform normal navigation
        window.location.href = targetId;
      }
    });
  });

  // Back-to-top button functionality
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

// Lightbox image gallery functionality
// let currentImageIndex = 0;
// let images = [];

// // Initialize array of image sources from portfolio items
// function initLightbox() {
//   images = Array.from(document.querySelectorAll(".portfolio-item img")).map(
//     (img) => img.src
//   );
// }

// // Open the lightbox with the clicked image
// function openLightbox(item) {
//   const imgSrc = item.querySelector("img").src;
//   const lightbox = document.getElementById("lightbox");
//   const lightboxImg = document.getElementById("lightbox-img");

//   currentImageIndex = images.indexOf(imgSrc);
//   lightboxImg.src = imgSrc;
//   lightbox.style.display = "flex";
// }

  let currentImageIndex = 0;
  let images = [];

  // Initialize array of image sources from the artwork tiles
  function initLightbox() {
    images = Array.from(document.querySelectorAll(".art-tile img")).map(
      (img) => img.src
    );
  }

  // Open the lightbox with the clicked image
  function openLightbox(item) {
    if (images.length === 0) initLightbox(); // Ensure images are initialized

    const imgSrc = item.querySelector("img").src;
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    currentImageIndex = images.indexOf(imgSrc);
    lightboxImg.src = imgSrc;
    lightbox.style.display = "flex";
  }

  // Optional: allow closing with ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      document.getElementById("lightbox").style.display = "none";
    }
  });


// Toggle collapse/expand on portfolio category headers
// function toggleCollapse(header) {
//   const content = header.nextElementSibling;
//   if (content.style.display === "block") {
//     content.style.display = "none";
//   } else {
//     content.style.display = "block";
//   }
// }

// Form validation to check required fields and valid email format
function validateContactForm() {
  const first = document.getElementById("firstName").value.trim();
  const last = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("formFeedback");

  if (!first || !last || !email || !message) {
    feedback.textContent = "Please fill in all required fields.";
    feedback.style.color = "red";
    return false;
  }

  if (!validateEmail(email)) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.style.color = "red";
    return false;
  }

  feedback.textContent = "Thank you! Your message has been sent.";
  feedback.style.color = "var(--accent)";
  document.getElementById("contactForm").reset();
  return false; // Prevent actual form submission for demo
}

// Simple regex email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

// Initialize lightbox image array when the window finishes loading
window.addEventListener("load", initLightbox);

// Handle animation for counters (e.g., project count, years in business)
function animateCountUp(el, target) {
  let count = 0;
  const step = Math.ceil(target / 100); // Adjust for speed
  const interval = setInterval(() => {
    count += step;
    if (count >= target) {
      count = target;
      clearInterval(interval);
    }
    el.textContent = count + (el.dataset.target >= 100 ? "+" : "");
  }, 20);
}

// Trigger animation for counters when they come into view
function handleScrollCount() {
  const counters = document.querySelectorAll(".count");
  counters.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight)
    ) {
      if (!el.classList.contains("counted")) {
        el.classList.add("counted");
        animateCountUp(el, parseInt(el.dataset.target));
      }
    }
  });
}

// Listen for scroll events to trigger counter animations
window.addEventListener("scroll", handleScrollCount);
window.addEventListener("load", handleScrollCount);




// NAVBAR SCROLL PERFECT
let lastScrollTop = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 50) {
    // Scroll down
    navbar.style.transform = "translateY(-100%)";
  } else {
    // Scroll up
    navbar.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});



// PORTFOLIO CARD PERFECT   
const track = document.getElementById("carouselTrack");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");

  function getScrollAmount() {
    return track.querySelector('.carousel-card').offsetWidth + 24;
  }

  nextBtn.addEventListener("click", () => {
    track.scrollLeft += getScrollAmount();
  });

  prevBtn.addEventListener("click", () => {
    track.scrollLeft -= getScrollAmount();
  });