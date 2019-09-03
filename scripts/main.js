// Animation library configuration
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

// General query selectors
let images = document.querySelectorAll(".cardCold img"),
  pageButtons = document.querySelectorAll(".js-page-switch"),
  contactClose = document.querySelectorAll(".js-contact-close"),
  wrapper = document.querySelector(".wrapper"),
  contactButton = document.querySelector(".contact-form-confirm"),
  alertPopup = document.querySelector(".alert-popup");

// Configuration object
const config = {
  pageTimer: 500,
};

// Add class utility function
const addClass = (element, cssClass) => {
  element.className = element.className + " " + cssClass;
};

// Remove class utility function
const removeClass = (element, cssClass) => {
  element.className = element.className.split(cssClass).join("");
  element.className = element.className.replace("  ", " ").trim();
};

// Page switcher function
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

// Popup alert function
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

// Contact submission
const submitContact = () => {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let message = document.querySelector("#message").value;

  //TODO: Add actual validation here
  coldAjax("GET", "ajaxScripts/mail.php?name=" + name + "&email=" + email + "&message=" + message, submitContactResponse);
};

// Callback function for contact ajax call
const submitContactResponse = data => {
  if (data.includes("success")) {
    console.log("success mail submission");
    pageAlert("Sent Message");
    pageSwitch("main-content");
  } else if (data.includes("failed")) {
    console.log("failed mail submission");
    pageAlert("Failed to Send Message");
  }
  console.log(data);
};

// Event Listeners
// Page changing buttons
pageButtons.forEach(element => {
  element.addEventListener(
    "click",
    () => {
      pageSwitch(event.target.dataset.page);
    },
    false
  );
});

// Card images
images.forEach(element => {
  element.parentNode.style.backgroundImage = "url(" + element.src + ")";
  element.remove();
});

// Contact submission button
contactButton.addEventListener("click", submitContact, false);
