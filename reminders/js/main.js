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
  coldAjax("GET", "ajaxScripts/delete.php?id=" + this.id + "&code=2", returned);
}

function successItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScripts/delete.php?id=" + this.id + "&code=1", returned);
}

function resetItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScripts/delete.php?id=" + this.id + "&code=0", returned);
}

function removeItem(e) {
  e.preventDefault();
  coldAjax("GET", "ajaxScripts/delete.php?id=" + this.id + "&code=3", returned);
}

function submitAct() {
  fetch("ajaxScripts/sendVal.php?thing=" + thing.value + "&time=" + time.value, { method: "GET" })
    .then(resp => {
      return resp.text();
    })
    .then(data => {
      returned(data);
    });
}

function saveAll() {
  let allItems = document.querySelectorAll(".items ul li");
  let sortVal = 0;
  let sort = "";
  let sortValues = "";
  allItems.forEach(element => {
    sortVal++;
    sort += element.id.replace("li", "") + ",";
    sortValues += sortVal + ",";
  });

  sort = sort.slice(0, -1);
  sortValues = sortValues.slice(0, -1);

  console.log(sort, sortValues);

  fetch("ajaxScripts/sort.php?sort=" + sort + "&sortVal=" + sortValues, { method: "GET" })
    .then(resp => {
      return resp.text();
    })
    .then(data => {
      sortCallback(data);
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
