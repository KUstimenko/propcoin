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

//form

function checkInputs() {
  const items = document.querySelectorAll(".item");
  console.log(items);
  for (const item of items) {
    if (item.value == "") {
      item.classList.add("error");
      item.parentElement.classList.add("error");
    }

    if (items[1].value != "") {
      checkEmail();
    }

    items[1].addEventListener("keyup", () => {
      checkEmail();
    });

    item.addEventListener("keyup", () => {
      if (item.value != "") {
        item.classList.remove("error");
        item.parentElement.classList.remove("error");
      } else {
        item.classList.add("error");
        item.parentElement.classList.add("error");
      }
    });
  }
}

function checkEmail() {
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,3})(\.[a-z]{2,3})?$/;
  const errorTxtEmail = document.querySelector(".error-txt.email");

  if (!email.value.match(emailRegex)) {
    email.classList.add("error");
    email.parentElement.classList.add("error");

    if (email.value != "") {
      errorTxtEmail.innerText = "Enter a valid email address";
    } else {
      errorTxtEmail.innerText = "Email Adress can't be blank";
    }
  } else {
    email.classList.remove("error");
    email.parentElement.classList.remove("error");
  }
}

async function handleSubmit(event) {
  event.preventDefault();
  checkInputs();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
        });
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
form.addEventListener("submit", handleSubmit);

function downloadFile(file1, file2) {
  const link1 = document.createElement("a");
  link1.href = "assets/" + file1;
  link1.download = file1;
  link1.target = "_self";

  document.body.appendChild(link1);
  link1.click();
  document.body.removeChild(link1);

  if (file2) {
    const link2 = document.createElement("a");
    link2.href = "assets/" + file2;
    link2.download = file2;
    link2.target = "_self";

    document.body.appendChild(link2);
    link2.click();
    document.body.removeChild(link2);
  }
}
