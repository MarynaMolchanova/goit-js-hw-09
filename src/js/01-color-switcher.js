function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  buttonStart: document.querySelector("[data-start]"),
  buttonStop: document.querySelector("[data-stop]"),
  body: document.querySelector("body"),
};

let timerId = null;
refs.buttonStop.disabled = true;

function changeColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function switchButtonsDisable(param) {
  refs.buttonStop.disabled = param ? false : true;
  refs.buttonStart.disabled = param ? true : false;
}

refs.buttonStart.addEventListener("click", () => {
  switchButtonsDisable(true);
  changeColor();
  timerId = setInterval(changeColor, 1000);
});

refs.buttonStop.addEventListener("click", () => {
  switchButtonsDisable(false);
  clearInterval(timerId);
});
