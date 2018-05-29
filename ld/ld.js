var timerInterval;
var affTimerInterval;
var negTimerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;
var affPrepMinutes = 0;
var affPrepSeconds = 0;
var affLastPrepSeconds = 0;
var affLastPrepMinutes = 0;
var negPrepMinutes = 0;
var negPrepSeconds = 0;
var negLastPrepSeconds = 0;
var negLastPrepMinutes = 0;
var currentRound = 0;

var roundNames = ["Affirmative Constructive", "Cross Examination", "Negative Constructive", "Cross Examination", "First Affirmative Rebuttal", "Second Negative Rebuttal", "Second Affirmative Rebuttal"];

var roundTimes = [6, 3, 7, 3, 4, 6, 3];

function start() {
    var startTime = Date.now();
    timerInterval = setInterval(function () { updateClock(startTime) }, 100);
    document.getElementById("startButton").setAttribute("onClick", "javascript: stop()");
    document.getElementById("startTitle").innerHTML = " Pause";
    document.getElementById("startIcon").setAttribute("class", "fas fa-pause");
}

function stop() {
    lastSeconds = seconds;
    lastMinutes = minutes;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
}

function nextRound() {
    if (currentRound < 6) {
        currentRound++;
        document.getElementById("roundName").innerHTML = roundNames[currentRound];
        reset();
    }

}

function lastRound() {
    if (currentRound > 0) {
        currentRound--;
        document.getElementById("roundName").innerHTML = roundNames[currentRound];
        reset();
    }
}

function reset() {
    lastMinutes = 0;
    lastSeconds = 0;
    document.getElementById("clock").innerHTML = `0:00`;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
    document.getElementById("overtimeLabel").style.display = "none";
}

function updateClock(startTime) {
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    seconds = lastSeconds + (secondsDiff % 60);
    minutes = lastMinutes + (Math.floor(secondsDiff / 60));
    var secondsString = "";
    if (seconds < 10) {
        secondsString = "0" + seconds;
    }
    else {
        secondsString = seconds;
    }
    document.getElementById("clock").innerHTML = `${minutes}:${secondsString}`;
    if (minutes >= roundTimes[currentRound]) {
        document.getElementById("overtimeLabel").style.display = "block";
    }
    if (minutes == roundTimes[currentRound] && seconds == 0) {
        playDing();
    }
}

function updateAffPrepClock(startTime) {
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    affPrepSeconds = affLastPrepSeconds + (secondsDiff % 60);
    affPrepMinutes = affLastPrepMinutes + (Math.floor(secondsDiff / 60));
    var secondsString = "";
    if (affPrepSeconds < 10) {
        secondsString = "0" + affPrepSeconds;
    }
    else {
        secondsString = affPrepSeconds;
    }
    document.getElementById("affClock").innerHTML = `${affPrepMinutes}:${secondsString}`;
    if (minutes == 4 && seconds == 0) {
        playDing();
    }
}

function updateNegPrepClock(startTime) {
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    negPrepSeconds = negLastPrepSeconds + (secondsDiff % 60);
    negPrepMinutes = negLastPrepMinutes + (Math.floor(secondsDiff / 60));
    var secondsString = "";
    if (negPrepSeconds < 10) {
        secondsString = "0" + negPrepSeconds;
    }
    else {
        secondsString = negPrepSeconds;
    }
    document.getElementById("negClock").innerHTML = `${negPrepMinutes}:${secondsString}`;
    if (minutes == 4 && seconds == 0) {
        playDing();
    }
}

function affPrepStart() {
    var startTime = Date.now();
    affTimerInterval = setInterval(function () { updateAffPrepClock(startTime) }, 100);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStop()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-pause");
}

function affPrepStop() {
    affLastPrepSeconds = affPrepSeconds;
    affLastPrepMinutes = affPrepMinutes;
    clearInterval(affTimerInterval);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStart()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-play");
}

function affPrepReset() {
    affLastPrepMinutes = 0;
    affLastPrepSeconds = 0;
    document.getElementById("affClock").innerHTML = `0:00`;
    clearInterval(affTimerInterval);
    document.getElementById("affPrepStartButton").setAttribute("onClick", "javascript: affPrepStart()");
    document.getElementById("affPrepStartIcon").setAttribute("class", "fas fa-play");
}

function negPrepStart() {
    var startTime = Date.now();
    negTimerInterval = setInterval(function () { updateNegPrepClock(startTime) }, 100);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepStop()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-pause");
}

function negPrepStop() {
    negLastPrepSeconds = negPrepSeconds;
    negLastPrepMinutes = negPrepMinutes;
    clearInterval(negTimerInterval);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepStart()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-play");
}

function negPrepReset() {
    negLastPrepMinutes = 0;
    negLastPrepSeconds = 0;
    document.getElementById("negClock").innerHTML = `0:00`;
    clearInterval(negTimerInterval);
    document.getElementById("negPrepStartButton").setAttribute("onClick", "javascript: negPrepstart()");
    document.getElementById("negPrepStartIcon").setAttribute("class", "fas fa-play");
}

function playDing() {
    document.getElementById("ding").play();
}