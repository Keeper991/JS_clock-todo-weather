const body = document.querySelector("body");

function printImage(imgNum) {
  const image = new Image();
  image.src = `img/${imgNum}.jpg`;
  image.classList.add("bgImage");
  body.prepend(image);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 5 + 1);
}

function initBg() {
  printImage(getRandomNumber());
}

initBg();
