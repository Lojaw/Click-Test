const buttonClickTimeRemaining = document.getElementById('clickTimeRemaining');
const buttonClickHereToStart = document.getElementById('clickHereToStart');
const buttonClicksPerSecond = document.getElementById('clicksPerSecond');
const buttonClicksAverage = document.getElementById('clickAverage');

//clickable button
const buttonBlock = document.getElementById('clickHereToStart');

let clicksPerSecond = 0;
let totalClicks = 0;
const counter = 10;
let time = counter;
let timerId;

let isGameStarted = false;

function startGame() {
     if(isGameStarted) {
       return;
     }

     isGameStarted = true;

     buttonClickHereToStart.innerHTML = "Klicken Sie jetzt so schnell wie möglich!";
     buttonClicksPerSecond.style.visibility="visible";
     buttonClickTimeRemaining.style.visibility="visible";
     buttonClicksAverage.style.visibility="visible";
     
     buttonBlock.addEventListener('click', event => {
       clicksPerSecond++;
       totalClicks++;
     });
     timerId = setInterval(updateButtons , 1000);
}

//called every second
function updateButtons() {
  time--;
  if(time <= 0) {
    clearInterval(timerId);
    buttonClickHereToStart.innerHTML = "Click here to start!";
    buttonClickTimeRemaining.innerHTML = 0;
    return;
  }

  buttonClicksPerSecond.innerHTML = clicksPerSecond;
  clicksPerSecond = 0;

  buttonClicksAverage.innerHTML = (totalClicks / (counter - time)).toFixed(2);
  
  buttonClickTimeRemaining.innerHTML = time;
}
