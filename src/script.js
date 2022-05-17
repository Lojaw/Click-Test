const buttonClickTimeRemaining = document.getElementById('clickTimeRemaining');
const buttonClickHereToStart = document.getElementById('clickHereToStart');
const buttonClicksPerSecond = document.getElementById('clicksPerSecond');
const buttonClicksAverage = document.getElementById('clickAverage');
const buttonTimeRange = document.getElementById('timeRange');
const buttonHighestCPS = document.getElementById('highestCPS');

//clickable button
const buttonBlock = document.getElementById('clickHereToStart');

let clicksPerSecond = 0;
let totalClicks = 0;
let counter = 0;
let time = counter;
let timerId;
let waitId;
let waitCounter = 3;
let highestCPS = 0;
let isWaitingFirstSecond = true;

let isGameStarted = false;

buttonBlock.addEventListener('click', event => {
  clicksPerSecond++;
  totalClicks++;
  isGameStarted = true;
});

function startGame() {
     if(isGameStarted) {
       return;
     }

     switch(buttonTimeRange.value) {
      case "0":
        counter = 5;
        break;
      case "1":
        counter = 10;
        break;
      case "2":
        counter = 15;
        break;
      case "3":
        counter = 30;
        break;
      case "4":
        counter = 60;
        break;
      
      default:
        counter = 15;

        
     }
     time = counter;
     
     buttonClickTimeRemaining.visibility="visible";
     buttonClicksPerSecond.style.visibility="visible";
     buttonClickTimeRemaining.style.visibility="visible";
     buttonClicksAverage.style.visibility="visible";
     buttonClickHereToStart.innerHTML = "Klicken Sie jetzt so schnell wie möglich!";
     
     updateButtons();
     timerId = setInterval(updateButtons , 1000);
}

function waitTimer() {
  if(!isWaitingFirstSecond) {
    waitCounter--;
  }
  switch(waitCounter) {
    case 1:
      buttonClickHereToStart.innerHTML = "Please wait 1 second to play again";
      break;
    case 0:
      buttonClickHereToStart.innerHTML = "Click here to start!";
      clearInterval(waitId);
      reset();
      break;
    default:
      buttonClickHereToStart.innerHTML = "Please wait " + waitCounter + " seconds to play again";
  }
}

//called every second
function updateButtons() {
  buttonClickTimeRemaining.innerHTML = "time left: " + counter;
  buttonClicksPerSecond.innerHTML = "CPS: " + clicksPerSecond;
    if(highestCPS < clicksPerSecond) {
      highestCPS = clicksPerSecond;
    }
    clicksPerSecond = 0;
    if(totalClicks == 0) {
      buttonClicksAverage.innerHTML = "CPS average: 0";
    } else {
      buttonClicksAverage.innerHTML = "CPS average: " + (totalClicks / (counter - time)).toFixed(2);
    }

    buttonClickTimeRemaining.innerHTML = "time left: " + time;
    if(time <= 0) {
      clearInterval(timerId);
      buttonHighestCPS.innerHTML = "highest CPS: " + highestCPS;
      buttonHighestCPS.style.visibility="visible";    

      waitTimer();
      isWaitingFirstSecond = false;
      waitId = setInterval(waitTimer , 1000);
    }
    time--;
}

function reset() {
  isGameStarted = false;
  clicksPerSecond = 0;
  totalClicks = 0;
  isClicked = false;
  waitCounter = 3;
  isWaitingFirstSecond = true;
}
