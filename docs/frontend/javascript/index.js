import "index.css";
import Alpine from "alpinejs";
import * as Turbo from "@hotwired/turbo";

// Import all JavaScript & CSS files from src/_components
import "bridgetownComponents/**/*.{js,jsx,js.rb,css}";

const scrollPositions = {};

document.addEventListener("turbo:before-render", function () {
  document
    .querySelectorAll("[data-turbo-maintain-scroll]")
    .forEach(function (element) {
      scrollPositions[element.id] = element.scrollTop;
    });
});

document.addEventListener("turbo:render", function () {
  document
    .querySelectorAll("[data-turbo-maintain-scroll]")
    .forEach(function (element) {
      element.scrollTop = scrollPositions[element.id];
    });
});

window.Alpine = Alpine;
Alpine.start();
