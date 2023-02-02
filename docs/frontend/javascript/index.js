import "index.css";
import "syntax-highlighting.css";
import * as Turbo from "@hotwired/turbo";
import components from "bridgetownComponents/**/*.{js,css}";

const scrollPositions = {};

function scrollToHash() {
  if (window.location.hash) {
    const article = document.getElementById("article");
    const scrollTarget = document.getElementById(
      window.location.hash.replace("#", "")
    );

    if (article && scrollTarget) {
      console.log(scrollTarget.offsetTop);
      article.scrollTo({
        top: scrollTarget.offsetTop,
        left: 0,
        behavior: "smooth",
      });
    }
  }
}

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

  window.Lookbook.initEmbeds();

  scrollToHash();
});

document.addEventListener("popstate", function () {
  scrollToHash();
});

scrollToHash();
