Array.from(document.querySelectorAll("button")).forEach((button) => {
  button.addEventListener("click", () => {
    console.log('Button clicked');
  })
})