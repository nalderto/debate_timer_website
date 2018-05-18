var timerIsRunning = false;
var timerInterval;

function start_stop(){
    if(!timerIsRunning){
        var startTime = Date.now();
        timerInterval = setInterval(function(){updateClock(startTime)}, 100);
        timerIsRunning = true;
    }
    else if(timerIsRunning){
        clearInterval(timerInterval);
        timerIsRunning = false;
    }
}

function updateClock(startTime){
    console.log(startTime);
    var change = Date.now() - startTime;
    console.log(change);
    var secondsDiff = Math.floor(change / 1000);
    console.log(secondsDiff);
    var seconds = secondsDiff % 60;
    var minutes = Math.floor(secondsDiff / 60);
    var secondsString = "";
    if (seconds < 10){
        secondsString = "0"+seconds;
    }
    else{
        secondsString = seconds;
    }
    document.getElementById("clock").innerHTML = `${minutes}:${secondsString}`;
}