export default class Goku{
    mm0 = "./assetMario/goku_0.png";
    mm1 = "./assetMario/goku_1.png";
    mm2 = "./assetMario/goku_2.png";
    mm3 = "./assetMario/goku_3.png";
    mm4 = "./assetMario/goku_4.png";
    mm5 = "./assetMario/goku_5.png";
    m = "./assetMario/goku.png";
    curmario = "./assetMario/goku.png";
    mg = "./assetMario/goku_gun1.png"
    mg2 = "./assetMario/goku_gun2.png"
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
            this.curmario = this.mm3;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm3){
            this.curmario = this.mm4;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm4){
            this.curmario = this.mm5;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }else if(this.curmario == this.mm5){
            this.curmario = this.mm0;
            document.getElementById("mario").querySelector("img").style.width = "15vh";
        }
        document.getElementById("mario").querySelector("img").src = this.curmario;
        //chỉnh background trôi về trái nếu không phải là đang cầm súng
        if(this.curmario == this.mg2){
            setBgFlow();
        }
    
    }
    //gun
    
    renderMarioGun(countDisplayGun){
        if (countDisplayGun <= 1){
            this.curmario = this.mg;
            document.getElementById("mario").querySelector("img").src = this.curmario;
        }else if(countDisplayGun > 1){
            this.curmario = this.mg2;
            document.getElementById("mario").querySelector("img").src = this.curmario;
        }
        if(this.curmario == this.mg && this.curmario == this.mg2){
            document.getElementById("mario").querySelector("img").style.width = "21vh";
        }else{
            document.getElementById("mario").querySelector("img").style.width = "17vh";
        }
        //tiện thể dừng background luôn
        setBgStop();
    }
    //mario die
    marioDead(){
        document.querySelector("#mario").querySelector("img").src = "./assetMario/godku.png";
        document.querySelector("#mario").querySelector("img").style.width = "20vh";
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/gokudead.png\")";
        document.querySelector("#bg").style.animation = "setGameOver 2s linear";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    //mario win
    marioWin(){
        document.querySelector("#mario").querySelector("img").src = "./assetMario/gokuwin.png";
        document.querySelector("#bg").style.animation = "setGokuWin 1s linear";   
        document.querySelector("#bg").style.backgroundImage = "url(\"./assetMario/gokuwinbg.png\")"; 
        document.querySelector("#mario").width = "10vh";
        document.querySelector("#mario").style.bottom = this.bottom;
        setBgStop();
    }
    playshotmusic(){
        var a = document.createElement("audio");
        a.src = "./assetMario/gokugun.mp3";
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
