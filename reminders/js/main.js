let color = Math.random() * 360;
document.querySelector(".wrapper").style.backgroundColor = "hsl(" + color + ",70%,70%)";
let thing = document.querySelector("#actionItem");
let time = document.querySelector("#time");
let submit = document.querySelector("#submit");
let deleteButtons = document.querySelectorAll(".delete");
let successButtons = document.querySelectorAll(".complete");
let resetButtons = document.querySelectorAll(".reset");
let removeButtons = document.querySelectorAll(".remove");

// Response for
function returned(data) {
  console.log(data);
  if (data.includes("success")) {
    location.reload(true);
  }
}

// Actions
function deleteItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScriptsdelete.php?id=" + this.id + "&code=2", returned);
}

function successItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScriptsdelete.php?id=" + this.id + "&code=1", returned);
}

function resetItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScriptsdelete.php?id=" + this.id + "&code=0", returned);
}

function removeItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScriptsdelete.php?id=" + this.id + "&code=3", returned);
}

function submitAct() {
  coldAjax("GET", "ajaxScriptssendVal.php?thing=" + thing.value + "&time=" + time.value, returned);
}

function saveAll() {
  let allItems = document.querySelectorAll(".items ul li");
  let sortVal = 0;
  console.log(allItems);
  allItems.forEach(element => {
    sortVal++;
    let sort = element.id.replace("li", "");
    coldAjax("GET", "ajaxScriptssort.php?sort=" + sort + "&sortVal=" + sortVal, sortCallback);
  });
}

function sortCallback(data) {
  console.log(data);
}

// Event Bindings
submit.addEventListener("click", submitAct, false);

deleteButtons.forEach(element => {
  element.addEventListener("click", deleteItem, false);
});

successButtons.forEach(element => {
  element.addEventListener("click", successItem, false);
});

resetButtons.forEach(element => {
  element.addEventListener("click", resetItem, false);
});

removeButtons.forEach(element => {
  element.addEventListener("click", removeItem, false);
});

// Sortables Initializations
new Sortable(document.querySelector("#todo-sortable"), {
  animation: 150,
  ghostClass: "blue-background-class",
  store: {
    set: () => {
      saveAll();
    },
  },
  dataIdAttr: "data-id",
  handle: ".handle",
});

new Sortable(document.querySelector("#done-sortable"), {
  animation: 150,
  ghostClass: "blue-background-class",
  store: {
    set: () => {
      saveAll();
    },
  },
  dataIdAttr: "data-id",
  handle: ".handle",
});
