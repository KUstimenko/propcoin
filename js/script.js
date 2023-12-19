// Update current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

// Mobile nav working buttons: (.nav-open)
const headerEl = document.querySelector(".header");
const openBtnEl = document.querySelector(".mobile-nav-icon.open");
const closeBtnEl = document.querySelector(".mobile-nav-icon.close");

openBtnEl.addEventListener("click", () => {
  headerEl.classList.add("nav-open");
});
closeBtnEl.addEventListener("click", () => {
  headerEl.classList.remove("nav-open");
});

// SMOOTH SCROOLING ANIMATION
const allLinks = document.querySelectorAll("a:link");
allLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const href = link.getAttribute("href");

    // SCROLL BACK TO TOP
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // SCROLL TO OTHER LINKS
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // CLOSE MENU WHEN LINK CLICKED
    if (link.classList.contains("menu-link"))
      headerEl.classList.toggle("nav-open");
  });
});

// Sticky navigation
const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  (entries) => {
    const ent = entries[0];
    if (!ent.isIntersecting) document.body.classList.add("sticky");
    else document.body.classList.remove("sticky");
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px", //same height sticky nav
  }
);
obs.observe(sectionHeroEl);

const downloadLinks = document.querySelectorAll(".download-link");

downloadLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    setTimeout(function () {
      window.open(link.href, "_blank");
    }, 100);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var buttons = document.querySelectorAll(".btn");
  console.log(buttons);

  buttons.forEach(function (button) {
    button.addEventListener("mouseenter", function (e) {
      var parentOffset = this.getBoundingClientRect(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      this.querySelector("span").style.top = relY + "px";
      this.querySelector("span").style.left = relX + "px";
    });

    button.addEventListener("mouseout", function (e) {
      var parentOffset = this.getBoundingClientRect(),
        relX = e.pageX - parentOffset.left,
        relY = e.pageY - parentOffset.top;
      this.querySelector("span").style.top = relY + "px";
      this.querySelector("span").style.left = relX + "px";
    });
  });
});

// Popup
const privacyLink = document.querySelector(".privacy");

const popup = document.querySelector(".privacy-popup");
const closeBtn = document.querySelector(".popup__close-btn");

privacyLink.addEventListener("click", () => {
  popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});
