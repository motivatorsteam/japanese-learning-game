export default class Mario{
    mm0 = "./assetMario/mario1_move0.png";
    mm1 = "./assetMario/mario1_move1.png";
    mm2 = "./assetMario/mario1_move2.png";
    m = "./assetMario/mario.png";
    curmario = "./assetMario/mario.png";
    mg = "./assetMario/mario1gun.png";
    bottom = "19vh";
    left = "15vw";
    //constructor
    constructor(){}
    //method
    //delay
    
    renderRun(){
        if(this.curmario == this.m){
            this.curmario = this.mm0;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm0){
            this.curmario = this.mm1;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm1){
            this.curmario = this.mm2;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm2){
            this.curmario = this.mm0;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }
        document.getElementById("mario").querySelector("img").src = this.curmario;
        //chỉnh background trôi về trái nếu không phải là đang cầm súng
        if(this.curmario == this.mg){
            setBgFlow();
        }
    
    }
    //gun
    
    renderMarioGun(){
        this.curmario = this.mg;
        document.getElementById("mario").querySelector("img").src = this.curmario;
        if(this.curmario == this.mg){
            document.getElementById("mario").querySelector("img").style.width = "21vh";
        }else{
            document.getElementById("mario").querySelector("img").style.width = "17vh";
        }
        //tiện thể dừng background luôn
        setBgStop();
    }
    //mario die
    marioDead(){
        document.querySelector("#mario").querySelector("img").src = "./assetMario/tomb.png";
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/mariodead.png\")";
        document.querySelector("#bg").style.animation = "setGameOver 2s linear";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    //mario win
    marioWin(){
        document.querySelector("#mario").querySelector("img").src = "./assetMario/mariowin.png";
        document.querySelector("#bg").style.animation = "setGameWin 1s linear";   
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/winbg.png\")"; 
        document.querySelector("#mario").width = "10vh";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    playshotmusic(){
    var a = document.createElement("audio");
    a.src = "./assetMario/gun.mp3";
    a.play();
}
}
function setBgStop(){
    document.querySelector("#jump").innerHTML = `
        #bg2{
            position: absolute;
            width: 200vw;
            height: 100vh;
            top: 1vh;
            background-image: url("./assetMario/bg3.png");
            background-size: cover;
        }
    `;
}
function setBgFlow(){
    document.querySelector("#jump").innerHTML = `
        #bg2{
            position: absolute;
            width: 200vw;
            height: 100vh;
            top: 1vh;
            background-image: url("./assetMario/bg3.png");
            background-size: cover;
            animation: bg2GoLeft 2s linear infinite;
        }
    `;
}
