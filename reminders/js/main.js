let color = Math.random() * 360;
let thing = document.querySelector('#actionItem');
let time = document.querySelector('#time');
let submit = document.querySelector('#submit');
document.querySelector('.wrapper').style.backgroundColor = "hsl(" + color + ",70%,70%)";
let deleteButtons = document.querySelectorAll('.delete');
let successButtons = document.querySelectorAll('.complete');
let resetButtons = document.querySelectorAll('.reset');
let removeButtons = document.querySelectorAll('.remove');

function returned(data) {
    console.log(data);
    if (data == "success") {
        location.reload(true);
    }
}

function deleteItem(e) {
    e.preventDefault();
    coldAjax("GET", "php/delete.php?id=" + this.id + "&code=2", returned);
}

function successItem(e) {
    e.preventDefault();
    coldAjax("GET", "php/delete.php?id=" + this.id + "&code=1", returned);
}

function resetItem(e) {
    e.preventDefault();
    coldAjax("GET", "php/delete.php?id=" + this.id + "&code=0", returned);
}

function removeItem(e) {
    e.preventDefault();
    coldAjax("GET", "php/delete.php?id=" + this.id + "&code=3", returned);
}

function submitAct() {
    coldAjax("GET", "php/sendVal.php?thing=" + thing.value + "&time=" + time.value, returned)
}

submit.addEventListener("click", submitAct, false);

deleteButtons.forEach(element => {
    element.addEventListener("click", deleteItem, false)
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
