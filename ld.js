var timerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;

var currentRound = 0;

var roundNames = ["Affirmative Constructive","Cross Examination","Negative Constructive","Cross Examination","First Affirmative Rebuttal","Second Negative Rebuttal","Second Affirmative Rebuttal"];

function start(){
        var startTime = Date.now();
        timerInterval = setInterval(function(){updateClock(startTime)}, 100);
        document.getElementById("startButton").setAttribute("onClick", "javascript: stop()");
        document.getElementById("startTitle").innerHTML = " Pause";
        document.getElementById("startIcon").setAttribute("class", "fas fa-pause");
}

function stop(){
    lastSeconds = seconds;
    lastMinutes = minutes;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
}

function nextRound(){
    if(currentRound < 6){
        currentRound++;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
}

function lastRound(){
    if(currentRound > 0){
        currentRound--;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
}

function reset() {
    lastMinutes = 0;
    lastSeconds = 0;
    document.getElementById("clock").innerHTML = `0:00`;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
    document.getElementById("startTitle").innerHTML = " Start";
    document.getElementById("startIcon").setAttribute("class", "fas fa-play");
}

function updateClock(startTime){
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    seconds = lastSeconds + (secondsDiff % 60);
    minutes = lastMinutes + (Math.floor(secondsDiff / 60));
    var secondsString = "";
    if (seconds < 10){
        secondsString = "0"+seconds;
    }
    else{
        secondsString = seconds;
    }
    document.getElementById("clock").innerHTML = `${minutes}:${secondsString}`;
}