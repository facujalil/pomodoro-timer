const allModeButtons = document.querySelectorAll(
  ".mode-buttons-container button"
);
const focusButton = document.querySelector(".focus-button");
const shortBreakButton = document.querySelector(".short-break-button");
const longBreakButton = document.querySelector(".long-break-button");
const timer = document.querySelector(".timer");
const startButton = document.querySelector(".start-button");
const pauseButton = document.querySelector(".pause-button");
const resetButton = document.querySelector(".reset-button");

let mode = "Focus";

let interval;

let min = 25;
let sec = 0;

focusButton.addEventListener("click", () => {
  mode = "Focus";
  reset();
});

shortBreakButton.addEventListener("click", () => {
  mode = "Short break";
  reset();
});

longBreakButton.addEventListener("click", () => {
  mode = "Long break";
  reset();
});

startButton.addEventListener("click", () => {
  start();
});

pauseButton.addEventListener("click", () => {
  pause();
});

resetButton.addEventListener("click", () => {
  reset();
});

const start = () => {
  startButton.style.display = "none";
  pauseButton.style.display = "block";
  resetButton.style.display = "block";

  interval = setInterval(() => {
    if (sec === 0) {
      min--;
      sec = 60;
    }
    sec--;
    timer.textContent = appendZero(min) + ":" + appendZero(sec);
    if (min === 0 && sec === 0) {
      clearInterval(interval);
      pauseButton.style.display = "none";
    }
  }, 1000);
};

const pause = () => {
  pauseButton.style.display = "none";
  resetButton.style.display = "none";
  startButton.style.display = "block";

  clearInterval(interval);
};

const reset = () => {
  allModeButtons.forEach((button) => {
    button.classList.remove("active");
    button.disabled = false;
  });

  if (mode === "Focus") {
    min = 25;
    sec = 0;
    focusButton.classList.add("active");
    focusButton.disabled = true;
  } else if (mode === "Short break") {
    min = 5;
    sec = 0;
    shortBreakButton.classList.add("active");
    shortBreakButton.disabled = true;
  } else {
    min = 15;
    sec = 0;
    longBreakButton.classList.add("active");
    longBreakButton.disabled = true;
  }

  pause();

  timer.textContent = appendZero(min) + ":" + appendZero(sec);
  timer.textContent = appendZero(min) + ":" + appendZero(sec);
};

const appendZero = (value) => {
  if (value < 10) {
    value = "0" + value;
  }
  return value;
};
