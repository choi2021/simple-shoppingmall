"use strict";
async function loadItems() {
  return fetch(`data/data.json`)
    .then((response) => response.json())
    .then((json) => json.items)
    .catch(console.log);
}

function displayItems(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join(" ");
}

function createHTMLString(item) {
  return `
  <li class="item" data-type=${item.type} data-color=${item.color}>
    <img src=${item.src} alt=${item.type + item.color}"><span>${item.gender}, ${
    item.size
  }</span>
  </li>
  `;
}

function updateItems(value) {
  const items = document.querySelectorAll(".item");
  items.forEach((item) => {
    const dataset = item.dataset;
    if (value === "logo") {
      item.classList.remove("invisible");
    } else if (dataset.type === value || dataset.color === value) {
      item.classList.remove("invisible");
    } else {
      item.classList.add("invisible");
    }
  });
}

function setEventlisteners(items) {
  const logo = document.querySelector(".logo");
  const btns = document.querySelector(".btns");
  logo.addEventListener("click", () => {
    updateItems("logo");
  });
  btns.addEventListener("click", (event) => {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    updateItems(value);
  });
}

loadItems().then((items) => {
  displayItems(items);
  setEventlisteners(items);
});
