const sneakyLabels = document.querySelectorAll('.sneaky');

sneakyLabels.forEach((element) => {
  element.style.opacity = 0;
  const labelContents = element.innerHTML;
  const field = document.querySelector(`#${element.getAttribute('for')}`);
  field.placeholder = labelContents;
  field.addEventListener('focus', () => {
    element.style.opacity = 1;
  });
  field.addEventListener('focusout', () => {
    if (field.value === '') {
      element.style.opacity = 0;
    }
  });
});
