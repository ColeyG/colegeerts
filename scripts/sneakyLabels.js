const sneakyLabels = document.querySelectorAll(".sneaky");

sneakyLabels.forEach(element => {
  element.style.opacity = 0;
  let labelContents = element.innerHTML;
  let field = document.querySelector("#" + element.getAttribute("for"));
  field.placeholder = labelContents;
  field.addEventListener("focus", () => {
    element.style.opacity = 1;
  });
  field.addEventListener("focusout", () => {
    if (field.value == "") {
      element.style.opacity = 0;
    }
  });
});
