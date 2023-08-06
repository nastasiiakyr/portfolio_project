// Header when scrolling

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
