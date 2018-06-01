var timerInterval;
var minutes = 0;
var seconds = 0;
var lastMinutes = 0;
var lastSeconds = 0;
var isMuted = false;
var currentRound = 0;

var roundNames = ["Proposition Speaker 1","Opposition Speaker 1","Proposition Speaker 2","Opposition Speaker 2","Proposition Speaker 3","Opposition Speaker 3","Opposition Reply", "Proposition Reply"];

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
    if(currentRound < 7){
        currentRound++;
    }
    document.getElementById("roundName").innerHTML = roundNames[currentRound];
    reset();
}

function lastRound(){
    if(currentRound > 0){
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
    $('#protectedWrapper').collapse('hide');
    $('#overtimeWrapper').collapse('hide');
}

function updateClock(startTime){
    var change = Date.now() - startTime;
    var secondsDiff = Math.floor(change / 1000);
    seconds = ((lastSeconds + secondsDiff) % 60);
    minutes = lastMinutes + (Math.floor((secondsDiff + lastSeconds) / 60));
    var secondsString = "";
    if (seconds < 10){
        secondsString = "0"+seconds;
    }
    else{
        secondsString = seconds;
    }
    document.getElementById("clock").innerHTML = `${minutes}:${secondsString}`;
    if(currentRound != 6 && currentRound != 7) {
        if (minutes == 0 && seconds == 0){
            $('#protectedWrapper').collapse('show');
        }
        else if (minutes == 8 && seconds == 0){
            $('#protectedWrapper').collapse('hide');
            playDing();
        }
        else if (minutes == 1 && seconds == 0) {
            $('#protectedWrapper').collapse('hide');
            playDing();
        }
        else if (minutes == 8 && seconds == 0) {
            $('#overtimeWrapper').collapse('show');
        }
        else if ((minutes == 7 && seconds == 0)){
            $('#protectedWrapper').collapse('show');
            playDing();
        }
        
    }
    else if(currentRound == 6 || currentRound == 7) {
        if (minutes == 0 && seconds == 0){
            $('#protectedWrapper').collapse('show');
        }
        else if (minutes == 4 && seconds == 0) {
            $('#protectedWrapper').collapse('hide');
            $('#overtimeWrapper').collapse('show');
            playDing();
        }
    }
}

function playDing() {
    if(!isMuted){
        document.getElementById("ding").play();
    }
}

function mute(){
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-off");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: unmute()");
    isMuted = true;
}

function unmute(){
    document.getElementById("volumeIcon").setAttribute("class", "fas fa-volume-up");
    document.getElementById("volumeButton").setAttribute("onClick", "javascript: mute()");
    isMuted = false;
}