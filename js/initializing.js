var date = new Date();

var time = {
  seconds: date.getSeconds(),
  minutes: date.getMinutes(),
  hours: (date.getHours() + 24) % 12 || 0,
};

var arrowClock = {
  seconds: document.querySelector(".secondsHand"),
  minutes: document.querySelector(".minutesHand"),
  hours: document.querySelector(".hoursHand"),
  vision: document.querySelector("#arrClock"),
  button: document.querySelector(".arrowButton"),
};

var electronicWatch = {
  seconds: document.querySelector(".seconds"),
  minutes: document.querySelector(".minutes"),
  hours: document.querySelector(".hours"),
  vision: document.querySelector(".electroClock"),
  button: document.querySelector(".electroButton"),
  secondsCondition: document.querySelectorAll(".secondsCondition"),
};

function clockTick() {
  time.seconds++;
  if (time.seconds == 60) {
    time.seconds = 0;
    time.minutes++;
    if (time.minutes == 60) {
      time.minutes = 0;
      time.hours++;
      if (time.hours == 12) time.hours = 0;
    }
  }
}

function buttonClick(clockCondition) {
  if (clockCondition) {
    arrowClock.vision.style.visibility = "visible";
    electronicWatch.vision.style.visibility = "hidden";
    arrowClock.button.style.border = "3px solid green";
    arrowClock.button.style["font-weight"] = "bold";
    arrowClock.button.style.color = "green";
    electronicWatch.button.style.border = "3px solid red";
    electronicWatch.button.style["font-weight"] = "bold";
    electronicWatch.button.style.color = "red";
  } else {
    arrowClock.vision.style.visibility = "hidden";
    electronicWatch.vision.style.visibility = "visible";
    arrowClock.button.style.border = "3px solid red";
    arrowClock.button.style["font-weight"] = "bold";
    arrowClock.button.style.color = "red";
    electronicWatch.button.style.border = "3px solid green";
    electronicWatch.button.style["font-weight"] = "bold";
    electronicWatch.button.style.color = "green";
  }
}

function clockFace() {
  var numeric = 1;
  var degris = 30;
  for (i = 0; i < 12; i++) {
    var numbers = document.createElement("span");
    numbers.className = "numbers";
    numbers.innerHTML = numeric;
    numeric++;
    numbers.style.transform = "rotate(" + degris + "deg)";
    degris += 30;
    arrClock.appendChild(numbers);
  }
}

function handClockStart() {
  var stepMinutes = 60 * time.minutes + time.seconds;
  var stepHours = 60 * time.hours + time.minutes;
  arrowClock.seconds.style.transform = "rotate(" + 6 * time.seconds + "deg)";
  arrowClock.minutes.style.transform = "rotate(" + 0.1 * stepMinutes + "deg)";
  arrowClock.hours.style.transform = "rotate(" + 0.5 * stepHours + "deg)";
}

function handClock() {
  clockFace();
  handClockStart();
  buttonClick(true);
  setInterval(() => {
    handClockStart();
  }, 1000);
}

function electronicClockStart() {
  time.hours < 10
    ? (electronicWatch.hours.innerHTML = "0" + time.hours)
    : (electronicWatch.hours.innerHTML = time.hours);
  time.minutes < 10
    ? (electronicWatch.minutes.innerHTML = "0" + time.minutes)
    : (electronicWatch.minutes.innerHTML = time.minutes);
  time.seconds < 10
    ? (electronicWatch.seconds.innerHTML = "0" + time.seconds)
    : (electronicWatch.seconds.innerHTML = time.seconds);
}

function doubleDotsCondition() {
  if (electronicWatch.vision.style.visibility == "hidden") {
    for (var elem of electronicWatch.secondsCondition) {
      elem.style.visibility = "hidden";
    }
  } else {
    if (time.seconds % 2 == 0) {
      for (var elem of electronicWatch.secondsCondition) {
        elem.style.visibility = "visible";
      }
    } else {
      for (var elem of electronicWatch.secondsCondition) {
        elem.style.visibility = "hidden";
      }
    }
  }
}

function electronicClock() {
  electronicClockStart();
  buttonClick(false);
  setInterval(() => {
    electronicClockStart();
    doubleDotsCondition();
  }, 1000);
}

document.addEventListener("DOMContentLoaded", function (event) {
  handClock();
  setInterval(() => clockTick(), 1000);
});
