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
  defaultAlertColor: "#3c3c3c",
  cautionAlertColor: "#DEEFB7",
  errorAlertColor: "#B3001B",
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
const pageAlert = (alertText, offset = config.pageTimer, color = config.defaultAlertColor) => {
  console.log(alertText);
  setTimeout(() => {
    let alertPopup = document.querySelector(".alert-popup"),
      alertPopupText = document.querySelector(".alert-popup-text");
    alertPopup.style.backgroundColor = color;
    alertPopupText.innerHTML = alertText;
    alertPopup.style.bottom = 100 + "px";
    setTimeout(() => {
      alertPopup.style.bottom = -150 + "px";
    }, config.pageTimer * 4);
  }, offset * 2);
};

// Contact submission
const submitContact = () => {
  let name = document.querySelector("#name").value,
    email = document.querySelector("#email").value,
    message = document.querySelector("#message").value,
    error = "";

  if (name === "" || email === "" || message === "") {
    if (error === "") {
      error = "Missing one or more field!";
    }
  }

  if (!email.includes("@") || !email.includes(".")) {
    if (error === "") {
      error = "Not a valid email address!";
    }
  }

  if (error === "") {
    coldAjax("GET", "ajaxScripts/mail.php?name=" + name + "&email=" + email + "&message=" + message, submitContactResponse);
  } else {
    pageAlert(error, 0, config.errorAlertColor);
  }
};

// Callback function for contact ajax call
const submitContactResponse = data => {
  if (data.includes("success")) {
    console.log("success mail submission");
    pageAlert("Sent Message");
    pageSwitch("main-content");
  } else if (data.includes("failed")) {
    console.log("failed mail submission");
    pageAlert("Failed to Send Message", 0, config.errorAlertColor);
  }
  console.log(data);
};

// Getting average image color
const getAverageImageColor = imgEl => {
  let sampleRate = 5,
    canvas = document.createElement("canvas"),
    context = canvas.getContext && canvas.getContext("2d"),
    data,
    width,
    height,
    i = -4,
    length,
    rgb = { r: 0, g: 0, b: 0 },
    count = 0;

  if (!context) {
    return "unsupported context";
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch (e) {
    /* security error, image on different domain */ alert("x");
    return "unsupported context";
  }

  length = data.data.length;

  while ((i += sampleRate * 4) < length) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i + 1];
    rgb.b += data.data[i + 2];
  }

  rgb.r = ~~(rgb.r / count);
  rgb.g = ~~(rgb.g / count);
  rgb.b = ~~(rgb.b / count);

  return rgb;
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
  let averageColor = getAverageImageColor(element);
  console.log(averageColor.r);
  element.parentNode.style.boxShadow = "5px 5px 10px rgba(0, 0, 0, .75), 5px 5px 10px rgba(" + averageColor.r + "," + averageColor.g + "," + averageColor.b + ",.75)";
  element.remove();
});

// Contact submission button
contactButton.addEventListener("click", submitContact, false);
