var timerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;


function start(){
        var startTime = Date.now();
        timerInterval = setInterval(function(){updateClock(startTime)}, 100);
        document.getElementById("startButton").setAttribute("onClick", "javascript: stop()");
}

function stop(){
    lastSeconds = seconds;
    lastMinutes = minutes;
    clearInterval(timerInterval);
    document.getElementById("startButton").setAttribute("onClick", "javascript: start()");
}

function reset() {
    lastMinutes = 0;
    lastSeconds = 0;
    document.getElementById("clock").innerHTML = `0:00`;
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