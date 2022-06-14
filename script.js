"use strict";

const mainElement = document.querySelector("main");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const submitForm = document.querySelector("#submit-form");
const buttonSubmit = document.querySelector("#add-book");
const finishedBook = document.querySelector("#finished-book");
const unfinishedBook = document.querySelector("#unfinished-book");

const generateId = () => +new Date();
const RENDER = "RENDER";
const STORAGE_KEY = "bookshelf";
let DATA = [];

/**
 *
 * @param {string} text Toast text
 * @param {string} type Toast type : success, info, failed | default success
 */
const createToast = (text, type = "success") => {
  const toast = document.createElement("div");
  toast.classList = `card toast toast__${type}`;
  toast.innerText = text;

  mainElement.append(toast);
  setTimeout(() => toast.remove(), 2000);
};

const createCard = (data) => {
  const cardContainer = document.createElement("div");
  cardContainer.classList = "card";

  const cardSummary = document.createElement("div");
  cardSummary.classList = "card__summary";
  cardSummary.innerText = data.title + data.author + data.year;

  const cardAction = document.createElement("div");
  cardAction.classList = "card__action";

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Remove";
  deleteButton.setAttribute("data-id", data.id);
  deleteButton.addEventListener("click", (e) => {
    const currentId = e.target.dataset.id;
    const idCard = DATA.findIndex((item) => item.id == currentId);
    DATA.splice(idCard, 1);

    document.dispatchEvent(new Event(RENDER));
    addToLocalStorage();
  });

  const finishButton = document.createElement("button");
  finishButton.innerText = "Finish";
  finishButton.setAttribute("data-id", data.id);
  finishButton.addEventListener("click", (e) => {
    const currentId = e.target.dataset.id;
    const idCard = DATA.findIndex((item) => item.id == currentId);
    DATA.splice(idCard, 1);

    document.dispatchEvent(new Event(RENDER));
    addToLocalStorage();
  });

  cardAction.append(finishButton, deleteButton);
  cardContainer.append(cardSummary, cardAction);

  finishedBook.append(cardContainer);
};

const addToLocalStorage = () => {
  const data = JSON.parse(DATA);
  localStorage.setItem(RENDER, data);
};

const checkLocalStorage = () => {
  const currentData = localStorage.getItem(STORAGE_KEY);

  if (currentData) {
    const dataFromStorage = JSON.parse(currentData);
    dataFromStorage.map((item) => DATA.push(item));
  }

  document.dispatchEvent(new Event(RENDER));
};

const appendToLocalStorage = () => {
  const data = JSON.parse(DATA);
  localStorage.setItem(RENDER, data);
};

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const year = yearInput.value;

  const currentData = {
    id: generateId(),
    title,
    author,
    year,
    isComplete: false,
  };

  addData(currentData);

  document.dispatchEvent(new Event(RENDER));
  addToLocalStorage();
});

document.addEventListener(RENDER, () => {
  finishedBook.innerHTML = "";
  unfinishedBook.innerHTML = "";

  DATA.map((item) => {
    createCard(item);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  checkLocalStorage();
});
