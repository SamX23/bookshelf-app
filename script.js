"use strict";

console.log("asd");

const mainElement = document.querySelector("main");

const createToast = (text) => {
  const container = document.createElement("div");
  container.classList = "card toast";
  container.innerText = text;

  mainElement.append(container);
};

document.addEventListener("DOMContentLoaded", () => {
  createToast();
});
