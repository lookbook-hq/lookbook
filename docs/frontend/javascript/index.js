import "index.css";
import "syntax-highlighting.css";
import * as Turbo from "@hotwired/turbo";
import components from "bridgetownComponents/**/*.{js,css}";

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
