const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav-links]");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const year = document.querySelector("[data-year]");
if (year) {
  year.textContent = new Date().getFullYear();
}

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    portfolioCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("is-hidden", !show);
    });
  });
});

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("is-visible"));
}

const videoButtons = document.querySelectorAll("[data-video-src]");
const videoModal = document.querySelector("[data-video-modal]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("#video-modal-title");
const closeVideoButtons = document.querySelectorAll("[data-close-video]");

if (videoModal && modalVideo && modalTitle) {
  videoButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const videoSrc = button.getAttribute("data-video-src");
      const videoTitle = button.getAttribute("data-video-title") || "Video Preview";

      modalTitle.textContent = videoTitle;

      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();

      modalVideo.setAttribute("src", videoSrc);
      modalVideo.load();

      videoModal.hidden = false;
      document.body.classList.add("modal-open");

      modalVideo.play().catch(() => {
        // Browser may block autoplay. The user can press play manually.
      });
    });
  });

  function closeVideoModal() {
    videoModal.hidden = true;
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    document.body.classList.remove("modal-open");
  }

  closeVideoButtons.forEach((button) => {
    button.addEventListener("click", closeVideoModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !videoModal.hidden) {
      closeVideoModal();
    }
  });
}