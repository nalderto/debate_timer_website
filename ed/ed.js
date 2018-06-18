var timerInterval;
var affTimerInterval;
var negTimerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;
var affPrepMinutes = 0;
var affPrepSeconds = 0;
var negPrepMinutes = 0;
var negPrepSeconds = 0;
var currentRound = 0;
var prepTime = 3;
var affPrepTimeLeft = prepTime * 60;
var negPrepTimeLeft = prepTime * 60;
var isMuted = false;

var roundNames = ["Proposition Constructive", "Cross Examination of Proposition", "Opposition Constructive", "Cross Examination of Opposition", "Mandatory Prep Time", "Proposition Rebuttal", "Opposition Rebuttal", "Mandatory Prep Time", "Proposition Rebuttal", "Opposition Rebuttal"];

var roundTimes = [2, 1, 2, 1, 1, 2, 2, 1, 2, 2];

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
    if (currentRound < 9) {
        currentRound++;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
    reset();
}

function lastRound() {
    if (currentRound > 0) {
        currentRound--;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
    reset();
}

function reset() {
    lastMinutes = 0;
    lastSeconds = 0;
    document.getElementById("clock").innerHTML = `0:00`;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
    $('#overtimeWrapper').collapse('hide');
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
    if (minutes == roundTimes[currentRound] && seconds == 0) {
        $('#overtimeWrapper').collapse('show');
        playDing();
    }
}

function playDing() {
    if (!isMuted) {
        document.getElementById("ding").play();
    }
}

function playAlarm() {
    if (!isMuted) {
        document.getElementById("alarm").play();
    }
}

function mute() {
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-off");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: unmute()");
    isMuted = true;
}

function unmute() {
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-up");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: mute()");
    isMuted = false;
}