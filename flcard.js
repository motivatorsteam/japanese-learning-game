var audio_fl = document.createElement("audio");
function zoom_div(div){
    var current_table = document.querySelectorAll(".button")[1].textContent;
    var text = div.querySelector(".smallcard").innerHTML;
    audio_fl.src = `./assetFlCard/sounds/${text}.mp3`;
    if (current_table.includes("hiragana")){
      document.getElementById("chargif").src = `./assetFlCard/katakana/${text}.gif`;
      document.getElementById("charcard").src = `./assetFlCard/kcard/${text}.png`;
      document.querySelector("#flashcard h1").innerHTML = text;
    }
    else{
      document.getElementById("chargif").src = `./assetFlCard/hiragana/${text}.gif`;
      document.getElementById("charcard").src = `./assetFlCard/hcard/${text}.png`;
      document.querySelector("#flashcard h1").innerHTML = text;
    }
      document.querySelector("#flashcard").style.display = "block";
      document.getElementById("homefl").style.opacity = 0.15;
      audio_fl.play();
}

function comeback(){
  document.querySelector("#flashcard").style.display = "none";
  document.getElementById("homefl").style.opacity = 1;
  audio_fl.pause();
}

function change_kata(){
  window.location.href = "./indexKatacard.html";
}

function change_hira(){
  window.location.href = "./indexHiracard.html";
}

function back_to_menu(){
  window.location.href = "./index.html";
}