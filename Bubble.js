var myGamePieces = new Array();
var activePiece = 0;
var canvasWidth = window.innerWidth*433/1000*3/2;
var canvasHeight = window.innerWidth*243/1000*3/2;
const characterWidth = 65;
const characterHeight = 65;
var on_press_hint = false;
var number_hint = 2;
var bubbletime = 0;
var hirab = true;
var bubaudio = document.createElement("audio");

document.getElementById("play").onclick = playbubble;
document.getElementById("setting").onclick = settingbubble;
document.getElementById("guide").onclick = guidebubble;
document.getElementById("quit").onclick = quitbubble;
document.getElementById("pausebutton").onclick = pausebubble;
document.getElementById("hintbutton").onclick = hintbubble;

document.querySelector("#settingtableb button").onclick = setting_to_menu;
document.querySelector("#guidetableb button").onclick = guide_to_menu;

function startGame() {
	if (hirab == true){
		initGamePieces();
	}else {
		initGamePiecesKata();
	}
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
		this.canvas.addEventListener('click', function(event) {
			var rect = this.getBoundingClientRect();
			var mouseX = (event.clientX - rect.left)
			var mouseY = (event.clientY - rect.top);
			if (mouseX >= myGamePieces[activePiece].x && mouseX <= (myGamePieces[activePiece].x + characterWidth)) {
				if (mouseY >= myGamePieces[activePiece].y && mouseY <= (myGamePieces[activePiece].y + characterHeight)) {
					activePiece++;
					if (activePiece <= 44) {
						on_press_hint = false;
						document.getElementById("tip").innerHTML = "The next letter is \"" + charactertextarray[activePiece] + "\"";
					}
				}
			}
		  }, false);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
	end : function() {
		document.getElementById("tip").innerText = "";
		document.getElementById("menu").style.display = "block";
		document.getElementById("menu").style.backgroundImage = `url("./assetBubble/winnerbubble.jpg")`;
		document.querySelector("canvas").style.display = "none";
		document.getElementById("playagain").style.display = "block";
		document.getElementById("play").style.display = "none";
		document.getElementById("setting").style.display = "none";
		document.getElementById("guide").style.display = "none";
		document.getElementById("quit").style.display = "none";
		document.getElementById("pausebutton").style.visibility = "hidden";
		this.stop();
		bubaudio.pause();
		var winaudio = document.createElement("audio");
		winaudio.src = "./assetBubble/win_music.mp3";
		winaudio.play();
	},
	restart : function() {
		window.location.href = "indexBubble.html";
	}
}

function component(letter) {
	this.image = new Image();
	this.image.src = letter;
	this.character = letter.substring(27, letter.length - 4);
    this.width = characterWidth;
    this.height = characterHeight;
    this.x = Math.random() * (canvasWidth - characterWidth);
    this.y = Math.random() * (canvasHeight - characterHeight);
	this.speedX = (Math.random() * 2) - 1;
    this.speedY = (Math.random() * 2) - 1;
    
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		if (this.x <= 0 || this.x >= (canvasWidth - characterWidth)) {
			this.speedX = this.speedX * -1;
		}
		if (this.y <= 0 || this.y >= (canvasHeight - characterHeight)) {
			this.speedY = this.speedY * -1;
		}
    }
	this.newPosHint = function() {
        this.x += this.speedX;
        this.y += this.speedY;
		if (this.x <= 0 || this.x >= (canvasWidth - 120)) {
			this.speedX = this.speedX * -1;
		}
		if (this.y <= 0 || this.y >= (canvasHeight - 120)) {
			this.speedY = this.speedY * -1;
		}
    }
	
	this.update = function() {
        ctx = myGameArea.context;
		ctx.drawImage(this.image, 
			this.x, 
			this.y,
			this.width, this.height);
    }
}

function updateGameArea() {
	bubbletime++;
	document.getElementById("timecal").innerHTML = secondsToMinutes(Math.floor(bubbletime/50));
    myGameArea.clear();
	
	if (activePiece >= 45) {
		myGameArea.end();
	}
	
	for (i = activePiece; i < 45; i++) {
		if (on_press_hint == true && i == activePiece){
			myGamePieces[i].newPosHint();
		}else{
			myGamePieces[i].newPos();
		}
		myGamePieces[i].update();
    }
}

function playbubble() {
	startGame();
	on_press_hint = false;
	number_hint = 2;
	bubbletime = 0;
    document.getElementById("menu").style.display = "none";
	document.querySelector("canvas").style.display = "block";
	document.getElementById("tip").innerText = "Click 'a' to move to the next letter";
	document.getElementById("tip").style.backgroundColor = "#f1f1f1";
	document.getElementById("tip").style.backgroundImage = "none";
	document.getElementById("pausebutton").style.visibility = "visible";
	document.getElementById("hintbutton").style.visibility = "visible";
	document.getElementById("timecal").style.visibility = "visible";
	bubaudio.src = "./assetBubble/bg_music.mp3";
	bubaudio.play();
	bubaudio.onended = function() {
	    bubaudio.play();
	}
}
function settingbubble() {
	document.querySelector(".buttonbubble").style.display = "none";
	document.getElementById("settingtableb").style.display = "block";
}
function guidebubble(){
	document.querySelector(".buttonbubble").style.display = "none";
	document.getElementById("guidetableb").style.display = "block";
}
function quitbubble(){
	window.location.href = "index.html";
}
function pausebubble(){
	activePiece = 0;
	myGameArea.stop();
    document.getElementById("menu").style.display = "block";
	document.querySelector("canvas").style.display = "none";
	document.getElementById("tip").innerText = "Welcome to BubbleClick";
	document.getElementById("tip").style.backgroundImage = `url("./assetBubble/bg_menu.gif")`;
	document.getElementById("pausebutton").style.visibility = "hidden";
	document.getElementById("hintbutton").style.visibility = "hidden";
	document.getElementById("timecal").style.visibility = "hidden";
	bubaudio.pause();
}

function setting_to_menu(){
	document.querySelector(".buttonbubble").style.display = "block";
	document.getElementById("settingtableb").style.display = "none";
	hirab = document.querySelector("#settinghirab").checked;
	if (hirab == true){
		document.querySelector("#settinghirab").checked = true;
	}else{
		document.querySelector("#settingkatab").checked = true;
	}
}

function guide_to_menu(){
	document.querySelector(".buttonbubble").style.display = "block";
	document.getElementById("guidetableb").style.display = "none";
}

function hintbubble(){
	if (number_hint > 0){
	    myGamePieces[activePiece].width = 120;
		myGamePieces[activePiece].height = 120;
		on_press_hint = true;
	}else{
	    alert("There's nothing left for you!")
	}
	number_hint--;
}

function secondsToMinutes(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
	if (seconds >= 60){
		return minutes + "m" + remainingSeconds + "s";
	} else{
		return remainingSeconds + "s";
	}
    
}