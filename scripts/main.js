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
  wrapper = document.querySelector(".wrapper"),
  contactButton = document.querySelector(".contact-form-confirm"),
  alertPopup = document.querySelector(".alert-popup");

const config = {
  pageTimer: 500,
};

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
  }, config.pageTimer);
};

const pageAlert = alertText => {
  console.log(alertText);
  setTimeout(() => {
    let alertPopupText = document.querySelector(".alert-popup-text");
    alertPopupText.innerHTML = alertText;
    alertPopup.style.bottom = 100 + "px";
    setTimeout(() => {
      alertPopup.style.bottom = -150 + "px";
    }, config.pageTimer * 4);
  }, config.pageTimer * 2);
};

const submitContactResponse = data => {
  if (data === "success") {
    console.log("success mail submission");
    pageAlert("Sent Message");
    pageSwitch("main-content");
  } else if (data === "failed") {
    console.log("failed mail submission");
    pageAlert("Failed to Send Message");
  }
  console.log(data);
};

const submitContact = () => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;

  coldAjax("GET", "ajaxScripts/mail.php?name=" + name + "&email=" + email + "&message=" + message, submitContactResponse);
};

//Event Listeners
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

contactButton.addEventListener("click", submitContact, false);
