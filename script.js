"use strict";

const mainElement = document.querySelector("main");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const submitForm = document.querySelector("#submit-form");
const buttonSubmit = document.querySelector("#add-book");
const finishedBook = document.querySelector("#finished-book");
const unfinishedBook = document.querySelector("#unfinished-book");

const DATA = [];
const generateId = () => +new Date();

/**
 *
 * @param {string} text Toast text
 * @param {string} type Toast type : success, info, failed | default success
 */
const createToast = (text, type = "success") => {
  const toast = document.createElement("div");
  toast.classList = `card toast toast-${type}`;
  toast.innerText = text;

  mainElement.append(toast);
  setTimeout(() => toast.remove(), 2000);
};

const createCard = (data) => {
  const card = document.createElement("div");
  card.classList = "card";
  card.innerText = data.title + data.author + data.year;

  finishedBook.append(card);
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

  DATA.push(currentData);
  createCard(currentData);
  createToast(`${title} has been added !`);
});

document.addEventListener("DOMContentLoaded", () => {
  createToast("Normal !");
  createToast("INFO !", "info");
  createToast("Error !", "error");
});
