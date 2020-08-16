function getClock() {
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const week = weeks[now.getDay()];
  const sec = now.getSeconds();
  const min = now.getMinutes();
  const hour = now.getHours();
  return { month, day, week, hour, min, sec };
}

function printClock() {
  const { month, day, week, hour, min, sec } = getClock();
  const days = document.querySelector(".js-days");
  const time = document.querySelector(".js-time");

  days.innerText = `${month < 10 ? `0${month}` : `${month}`}. ${
    day < 10 ? `0${day}` : `${day}`
  } (${week})`;
  time.innerText = `${hour < 10 ? `0${hour}` : `${hour}`}:${
    min < 10 ? `0${min}` : `${min}`
  }:${sec < 10 ? `0${sec}` : `${sec}`}`;
}

function initClock() {
  setInterval(printClock, 1000);
}

initClock();
