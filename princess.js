export default class Princess{
    mm0 = "./assetMario/princess_0.png";
    mm1 = "./assetMario/princess_1.png";
    m = "./assetMario/princess.png";
    curmario = "./assetMario/princess.png";
    mg = "./assetMario/princessgun.png"
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
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/princessdead.jpg\")";
        document.querySelector("#bg").style.animation = "setGameOver 2s linear";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    //mario win
    marioWin(){
        document.querySelector("#mario").querySelector("img").src = "./assetMario/princess_win.png";
        document.querySelector("#bg").style.animation = "setGameWin 1s linear";   
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/winbg.png\")"; 
        document.querySelector("#mario").width = "10vh";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    playshotmusic(){
        var a = document.createElement("audio");
        a.src = "./assetMario/princessgun.mp3";
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
