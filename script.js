"use strict";

const mainElement = document.querySelector("main");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const yearInput = document.querySelector("#year");
const submitForm = document.querySelector("#submit-form");
const buttonSubmit = document.querySelector("#add-book");
const finishedBookCase = document.querySelector("#finished-book");
const unfinishedBookCase = document.querySelector("#unfinished-book");

const generateId = () => +new Date();
const RENDER = "RENDER";
const STORAGE_KEY = "bookshelf";
let BOOKS = [];

/**
 *
 * @param {string} text Toast text
 * @param {string} type Toast type : success, info, error | default success
 */
const createToast = (text, type = "success") => {
  const toast = document.createElement("div");
  toast.classList = `card toast toast__${type}`;
  toast.innerText = text;

  mainElement.append(toast);
  setTimeout(() => toast.remove(), 2000);
};

const findTodo = (bookId) => {
  for (const bookItem of BOOKS) {
    if (bookItem.id === bookId) return bookItem;
  }
  return null;
};

const finishBookTask = (bookObject) => {
  const bookTarget = findTodo(bookObject.id);

  if (bookTarget != null) {
    bookTarget.isCompleted = true;

    document.dispatchEvent(new Event(RENDER));
    addToLocalStorage();
    createToast(
      `You have finished reading ${bookObject.title} books !`,
      "info"
    );
  }
};

const undoBookTask = (bookObject) => {
  const bookTarget = findTodo(bookObject.id);

  if (bookTarget != null) {
    bookTarget.isCompleted = false;

    document.dispatchEvent(new Event(RENDER));
    addToLocalStorage();
    createToast(`You have undo reading ${bookObject.title} books !`, "info");
  }
};

const removeBookTask = (bookObject) => {
  const idCard = BOOKS.findIndex((item) => item.id == bookObject.id);
  BOOKS.splice(idCard, 1);

  document.dispatchEvent(new Event(RENDER));
  addToLocalStorage();
  createToast(`${bookObject.title} deleted`, "error");
};

const createCard = (bookObject) => {
  const { title, author, year, isCompleted } = bookObject;

  const cardContainer = document.createElement("div");
  cardContainer.classList = "card";
  cardContainer.id = bookObject.id;

  const cardSummary = document.createElement("div");
  cardSummary.classList = "card__summary";
  cardSummary.innerHTML = `Title : ${title}<br/>Author : ${author}<br/>Year : ${year}`;

  const cardAction = document.createElement("div");
  cardAction.classList = "card__action";

  if (isCompleted) {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Remove";

    deleteButton.addEventListener("click", () => removeBookTask(bookObject));

    const undoButton = document.createElement("button");
    undoButton.innerText = "Undo";

    undoButton.addEventListener("click", () => undoBookTask(bookObject));

    cardAction.append(undoButton, deleteButton);
  } else {
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Remove";

    deleteButton.addEventListener("click", () => removeBookTask(bookObject));

    const finishButton = document.createElement("button");
    finishButton.innerText = "Finish";

    finishButton.addEventListener("click", () => finishBookTask(bookObject));

    cardAction.append(finishButton, deleteButton);
  }

  cardContainer.append(cardSummary, cardAction);

  return cardContainer;
};

const addToLocalStorage = () => {
  const data = JSON.stringify(BOOKS);
  localStorage.setItem(STORAGE_KEY, data);

  document.dispatchEvent(new Event(RENDER));
};

const checkLocalStorage = () => {
  const currentData = localStorage.getItem(STORAGE_KEY);
  const dataFromStorage = JSON.parse(currentData);

  dataFromStorage && dataFromStorage.map((item) => BOOKS.push(item));
  document.dispatchEvent(new Event(RENDER));
};

const addTodo = () => {
  const title = titleInput.value;
  const author = authorInput.value;
  const year = yearInput.value;

  const currentData = {
    id: generateId(),
    title,
    author,
    year,
    isCompleted: false,
  };

  BOOKS.push(currentData);

  document.dispatchEvent(new Event(RENDER));
  addToLocalStorage();
};

submitForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addTodo();
});

document.addEventListener(RENDER, () => {
  finishedBookCase.innerHTML = "";
  unfinishedBookCase.innerHTML = "";

  BOOKS.map((book) => {
    const card = createCard(book);

    book.isCompleted
      ? finishedBookCase.append(card)
      : unfinishedBookCase.append(card);
  });
});

document.addEventListener("DOMContentLoaded", () => checkLocalStorage());
