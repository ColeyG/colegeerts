const bezier = ".64,1.53,1,1.07";

anime({
  targets: ".leftBall",
  keyframes: [{ rotate: 45 }, { rotate: 0 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});

anime({
  targets: ".rightBall",
  keyframes: [{ rotate: 0 }, { rotate: 0 }, { rotate: -45 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});

anime({
  targets: ".mainBall",
  keyframes: [{ rotate: 5 }, { rotate: 0 }, { rotate: -5 }, { rotate: 0 }],
  loop: true,
  easing: "cubicBezier(" + bezier + ")",
});

let images = document.querySelectorAll(".cardCold img"),
  pageButtons = document.querySelectorAll(".js-page-switch"),
  contactClose = document.querySelectorAll(".js-contact-close"),
  wrapper = document.querySelector(".wrapper");

const addClass = (element, cssClass) => {
  element.className = element.className + " " + cssClass;
};

const removeClass = (element, cssClass) => {
  //TODO: Not perfect, need to remove space around
  element.className = element.className.split(cssClass).join("");
};

const pageSwitch = page => {
  wrapper.style.opacity = 0;
  setTimeout(() => {
    let sections = document.querySelectorAll("[data-page]");

    sections.forEach(element => {
      addClass(document.querySelector("." + element.dataset.page), "sec-hidden");
    });

    removeClass(document.querySelector("." + page), "sec-hidden");
    wrapper.style.opacity = 1;
  }, 500);
};

pageButtons.forEach(element => {
  element.addEventListener(
    "click",
    () => {
      pageSwitch(event.target.dataset.page);
    },
    false
  );
});

images.forEach(element => {
  element.parentNode.style.backgroundImage = "url(" + element.src + ")";
  element.remove();
});
