window.onscroll = function () {
  let header = document.querySelector("#header");
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    header.classList.add("scrolling");
  } else {
    header.classList.remove("scrolling");
  }
};
