// HEADER when scrolling

let header = document.querySelector("#header");

window.onscroll = function () {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add("scrolling");
  } else {
    header.classList.remove("scrolling");
  }
};

//WORK OF BURGER MENU

function openMenu() {
  toggler.classList.toggle("active");
  header.classList.toggle("active");

  menuIcon.classList.toggle("disabled");
  closeIcon.classList.toggle("disabled");
}

// Changing Bootstrap Togler to the custom one and switching to close button when menue is active

let toggler = document.querySelector("#custom-toggler");
let menu = document.querySelector("#navbarNavAltMarkup");
let menuIcon = document.querySelector(".menu-icon");
let closeIcon = document.querySelector(".close-icon");
let menuCollapse = new bootstrap.Collapse(menu, { toggle: false });

toggler.addEventListener("click", function () {
  menuCollapse.toggle("active");
  openMenu();
});

// Closing responsive menu when pressing Contacts button

let menuLinks = document.querySelectorAll(".menu-item");

menuLinks.forEach((link) => {
  link.addEventListener("click", function () {
    menuCollapse.hide();
    openMenu();
  });
});

// CUSTOM CURSOR

class CircleAndDot {
  constructor() {
    this.root = document.body;
    this.cursor = document.querySelector(".circle-and-dot");

    (this.position = {
      distanceX: 0,
      distanceY: 0,
      distance: 0,
      pointerX: 0,
      pointerY: 0,
    }),
      (this.previousPointerX = 0);
    this.previousPointerY = 0;
    this.angle = 0;
    this.previousAngle = 0;
    this.angleDisplace = 0;
    this.degrees = 57.296;
    this.cursorSize = 20;
    this.fading = false;

    this.cursorStyle = {
      boxSizing: "border-box",
      position: "fixed",
      top: `${this.cursorSize / -2}px`,
      left: `${this.cursorSize / -2}px`,
      zIndex: "2147483647",
      width: `${this.cursorSize}px`,
      height: `${this.cursorSize}px`,
      backgroundColor: "#fff0",
      border: "1.25px solid #fff",
      borderRadius: "50%",
      boxShadow: "0 -15px 0 -8px #fff",
      transition: "250ms, transform 100ms",
      userSelect: "none",
      pointerEvents: "none",
    };

    this.init(this.cursor, this.cursorStyle);
  }

  init(el, style) {
    Object.assign(el.style, style);
    this.cursor.style.opacity = 1;
  }

  move(event) {
    this.previousPointerX = this.position.pointerX;
    this.previousPointerY = this.position.pointerY;
    this.position.pointerX = event.pageX + this.root.getBoundingClientRect().x;
    this.position.pointerY = event.pageY + this.root.getBoundingClientRect().y;
    this.position.distanceX = this.previousPointerX - this.position.pointerX;
    this.position.distanceY = this.previousPointerY - this.position.pointerY;
    this.distance = Math.sqrt(
      this.position.distanceY ** 3 + this.position.distanceX ** 3
    );

    if (
      event.target.localName === "svg" ||
      event.target.localName === "a" ||
      event.target.localName === "button" ||
      event.target.onclick !== null ||
      Array.from(event.target.classList).includes("cursor-hover")
    ) {
      this.hover();
    } else {
      this.hoverout();
    }

    this.cursor.style.transform = `translate3d(${this.position.pointerX}px, ${this.position.pointerY}px, 0)`;

    this.rotate(this.position);
    this.fade(this.distance);
  }

  rotate(position) {
    let unsortedAngle =
      Math.atan(Math.abs(position.distanceY) / Math.abs(position.distanceX)) *
      this.degrees;
    this.previousAngle = this.angle;

    if (position.distanceX <= 0 && position.distanceY >= 0) {
      this.angle = 90 - unsortedAngle + 0;
    } else if (position.distanceX < 0 && position.distanceY < 0) {
      this.angle = unsortedAngle + 90;
    } else if (position.distanceX >= 0 && position.distanceY <= 0) {
      this.angle = 90 - unsortedAngle + 180;
    } else if (position.distanceX > 0 && position.distanceY > 0) {
      this.angle = unsortedAngle + 270;
    }

    if (isNaN(this.angle)) {
      this.angle = this.previousAngle;
    } else {
      if (this.angle - this.previousAngle <= -270) {
        this.angleDisplace += 360 + this.angle - this.previousAngle;
      } else if (this.angle - this.previousAngle >= 270) {
        this.angleDisplace += this.angle - this.previousAngle - 360;
      } else {
        this.angleDisplace += this.angle - this.previousAngle;
      }
    }
    this.cursor.style.transform += ` rotate(${this.angleDisplace}deg)`;
  }

  hover() {
    this.cursor.style.border = "10px solid var(--cursor-bg-line)";
  }

  hoverout() {
    this.cursor.style.border = "1.25px solid var(--cursor-bg-line)";
  }

  fade(distance) {
    this.cursor.style.boxShadow = `0 ${
      -15 - distance
    }px 0 -8px var(--cursor-bg-line)`;
    if (!this.fading) {
      this.fading = true;
      setTimeout(() => {
        this.cursor.style.boxShadow = "0 -15px 0 -8px var(--cursor-bg-line)";
        this.fading = false;
      }, 50);
    }
  }

  click() {
    this.cursor.style.transform += ` scale(0.75)`;
    setTimeout(() => {
      this.cursor.style.transform = this.cursor.style.transform.replace(
        ` scale(0.75)`,
        ""
      );
    }, 35);
  }

  hidden() {
    this.cursor.style.opacity = 0;
    setTimeout(() => {
      this.cursor.setAttribute("hidden", "hidden");
    }, 500);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let cursor = new CircleAndDot();
  document.onmousemove = function (event) {
    cursor.move(event);
  };
  document.ontouchmove = function (event) {
    cursor.move(event.touches[0]);
  };
  document.onclick = function () {
    if (typeof cursor.click === "function") {
      cursor.click();
    }
  };
});

// CONTACTS TEMPLATE

let contactsSection = document.querySelector(".contact-screen");

let contactsHTML = `<img
        src="/img/contact_img.png"
        alt="Contacts"
        class="img-fluid contact-img"
      />

      <div class="container">
        <div class="row">
          <h2>Contact me</h2>
          <p>
            Feel free to get in touch for collaboration or just friendly hello
          </p>
        </div>
        <div class="row">
          <a
            href="mailto:anastasiia.kyrkilan@gmail.com"
            class="col-lg mail-link"
            ><h3 class="cursor-hover">anastasiia.kyrkilan@gmail.com &nbsp📨</h3></a
          >
          <div class="col-lg social-media-links">
            <a href="https://www.behance.net/kyrkilan" target="_blank"
              >Behance</a
            >
            <a href="https://www.facebook.com/ann.kyr" target="_blank"
              >Facebook</a
            >
            <a
              href="https://github.com/nastasiiakyr?tab=repositories"
              target="_blank"
              >GitHub</a
            >
            <a href="https://www.linkedin.com/in/kyrkilan/" target="_blank"
              >LinkedIn</a
            >
          </div>
        </div>
      </div>`;

contactsSection.innerHTML = contactsHTML;

// FOOTER TEMPLATE

let footerSection = document.querySelector(".footer");

let footerHTML = `<hr />
      <div class="container">
        <div class="row">
          <div class="col-lg rights">
            <p>Designed and developed by Anastasiia Kyrkilan &copy;</p>
          </div>
          <div class="col-lg help-ua">
            <p>With love from and to</p>
            <img src="/icons/heart-ua.svg" alt="Help Ukraine" />
            <p>If You want to help Ukraine, please,</p>
            <a href="https://war.ukraine.ua/support-ukraine/" target="_blank"
              >join</a
            >
          </div>
        </div>
      </div>`;

footerSection.innerHTML = footerHTML;

// THEME SWITCHING

function toggleTheme() {
  // Getting the state of the toggler
  let switcher = document.getElementById("switcher-1");
  let isLightTheme = switcher.checked;

  // Set the theme according to the toggler's state
  let themeLink = document.getElementById("theme-link");
  themeLink.setAttribute(
    "href",
    isLightTheme ? "/src/light-theme.css" : "/src/dark-theme.css"
  );

  // Save the states to the localStorage
  localStorage.setItem("switcherState", isLightTheme ? "true" : "false");
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
}

window.onload = function () {
  var theme = localStorage.getItem("theme");

  // Set default theme if there isn't the saved one in the localStorage
  if (!theme) {
    localStorage.setItem("theme", "dark");
    theme = "dark";
  }

  let themeUrl = document.getElementById("theme-link");
  themeUrl.setAttribute(
    "href",
    theme === "dark" ? "/src/dark-theme.css" : "/src/light-theme.css"
  );

  // Get toggler's state from the localStorage
  let switcherState = localStorage.getItem("switcherState");

  let switcher = document.getElementById("switcher-1");

  // Set the toogler according the local storage or by default
  switcher.checked = switcherState === "true"; 
};

// Changing the theme with toggler
document.getElementById("switcher-1").addEventListener("change", function () {
  toggleTheme();
});

// WORKS CARDS HTML TEMPLATE AND FILTER

// Library of projects with details

let cardWorks = {
  "Relax and meditation App": {
    type: "design",
    link: "https://www.behance.net/gallery/123818199/Relax-Me-Mobile-App-for-Relax-Meditation",
    image: "/img/works/relax_app_color.png",
    alt: "Relax & meditation App",
  },

  "Maksy-english": {
    type: "design, front",
    link: "https://www.maksyenglish.com.ua/",
    image: "/img/works/maksy-english_web.png",
    alt: "English learning website on WordPress for maksy_english",
  },

  "Weather app JS": {
    type: "front",
    link: "https://weather-app-vanilla-js-kyrkilan.netlify.app/",
    image: "/img/works/weather_app_color.png",
    alt: "Weather app Java Script",
  },

  "Weather app React": {
    type: "design, front",
    link: "https://weather-app-react-kyrkilan.netlify.app/",
    image: "/img/works/weather_app_react.png",
    alt: "Weather app React.js",
  },

  "Jane Kyr Design": {
    type: "front",
    link: "https://janekyrdesign.com/",
    image: "/img/works/janekyr_web.png",
    alt: "Personal landing for Jane Kyr",
  },

  "Online shop of lights": {
    type: "design",
    link: "https://www.behance.net/gallery/104890723/Edison-light-web-concept-for-lamps-online-store",
    image: "/img/works/edison_web_color.png",
    alt: "Online shop of lights",
  },

  "Laundry in London": {
    type: "design",
    link: "https://www.behance.net/gallery/89852873/Landing-page-for-elegant-clothes-laundry",
    image: "/img/works/laundry_web_color.png",
    alt: "Laundry in London",
  },

  "Support Ukraine page": {
    type: "design, front",
    link: "https://www.shecodes.io/cohorts/shecodes-basics-c6a6b8f0-6f86-45b6-8911-0116302cc636/projects/1605069",
    image: "/img/works/support_ukraine_color.png",
    alt: "Support Ukraine",
  },
};

// HTML template

let worksSection = document.querySelector("#works-cards");
let worksHTML = "";

for (let card in cardWorks) {
  if (cardWorks.hasOwnProperty(card)) {
    worksHTML += `<div class="col-lg-6 work" data-category="${cardWorks[card]["type"]}">
              <a
                href="${cardWorks[card]["link"]}"
                target="_blank"
              >
                <img
                  src="${cardWorks[card]["image"]}"
                  alt="${cardWorks[card]["alt"]}"
                  class="img-fluid cursor-hover"
                  
                />
              </a>
            </div>`;
  }
}

// Pushing to HTML

document.addEventListener("DOMContentLoaded", function () {
  worksSection.innerHTML = worksHTML;
});

// Filter of works by type with tabs on the Works Page

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll(".tab-button");
  const works = document.querySelectorAll(".work");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((tab) => tab.classList.remove("active"));

      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      works.forEach((work) => {
        const workType = work.getAttribute("data-category").split(", ");

        if (filter === "all" || workType.includes(filter)) {
          work.classList.remove("disabled");
        } else {
          work.classList.add("disabled");
        }
      });
    });
  });
});

// ABOUT ME SERTIFICATES HTML TEMPLATE

// Library of certificates with details

let certificates = {
  "QA Testing": {
    image: "/img/certificates/QATestLab01.jpg",
    alt: "QA Testing certificate from QATestLab",
  },

  "GoIT English HTML": {
    image: "/img/certificates/GoIT01.png",
    alt: "GoIT English HTML certificate",
  },

  "SheCodes Introducing to coding": {
    image: "/img/certificates/SheCodes01.png",
    alt: "SheCodes Introducing to coding certificate",
  },

  "SheCodes Web Development": {
    image: "/img/certificates/SheCodes02.png",
    alt: "SheCodes Web Development certificate",
  },

  "SheCodes Responsive Web Development": {
    image: "/img/certificates/SheCodes03.png",
    alt: "SheCodes Responsive Web Development certificate",
  },

  "SheCodes React Development": {
    image: "/img/certificates/SheCodes04.png",
    alt: "SheCodes React Development certificate",
  },

  "Google UX Design Foundations": {
    image: "/img/certificates/Coursera01.jpg",
    alt: "Google professional certificate in UX Design: Foundations of UX Design",
  },

  "Google UX Design Start": {
    image: "/img/certificates/Coursera02.jpg",
    alt: "Google professional certificate in UX Design: Start the process - Empathize, Define and Idiate",
  },

  "Google UX Design Research": {
    image: "/img/certificates/Coursera03.jpeg",
    alt: "Google professional certificate in UX Design: Conduct UX Research and Test Early Concepts",
  },
};

// HTML template

let certificatesSection = document.querySelectorAll(".certificates");
let certificatesHTML = "";

for (let certificate in certificates) {
  if (certificates.hasOwnProperty(certificate)) {
    certificatesHTML += `<img src="${certificates[certificate]["image"]}" alt="${certificates[certificate]["alt"]}" class="img-certificate">`;
  }
}

// Pushing to HTML

document.addEventListener("DOMContentLoaded", function () {
  certificatesSection.forEach(function (certificateSection) {
    certificateSection.innerHTML = certificatesHTML;
  });
});
