export default class e{mm0="./assetMario/mario1_move0.png";mm1="./assetMario/mario1_move1.png";mm2="./assetMario/mario1_move2.png";mj="./assetMario/mario1_jump.png";m="./assetMario/mario.png";curmario="./assetMario/mario.png";bottom="19vh";left="15vw";constructor(){}renderRun(){this.curmario==this.m?(this.curmario=this.mm0,document.getElementById("mario").querySelector("img").style.width="15vh"):this.curmario==this.mm0?(this.curmario=this.mm1,document.getElementById("mario").querySelector("img").style.width="15vh"):this.curmario==this.mm1?(this.curmario=this.mm2,document.getElementById("mario").querySelector("img").style.width="15vh"):this.curmario==this.mm2&&(this.curmario=this.mm0,document.getElementById("mario").querySelector("img").style.width="15vh"),document.getElementById("mario").querySelector("img").src=this.curmario,"./assetMario/mariogun3.png"==this.curmario&&setBgFlow()}renderMarioGun(){this.curmario="./assetMario/mariogun3.png",document.getElementById("mario").querySelector("img").src=this.curmario,"./assetMario/mariogun3.png"==this.curmario?document.getElementById("mario").querySelector("img").style.width="21vh":document.getElementById("mario").querySelector("img").style.width="17vh",setBgStop()}marioDead(){document.querySelector("#mario").querySelector("img").src="./assetMario/tomb.png",document.querySelector("#mario").style.bottom=this.bottom,setBgStop()}marioWin(){document.querySelector("#mario").querySelector("img").src="./assetMario/mariowin.png",document.querySelector("#mario").width="10vh",document.querySelector("#mario").style.bottom=this.bottom,setBgStop()}};function setBgStop(){document.querySelector("#jump").innerHTML=`
        #bg2{
            position: absolute;
            width: 200vw;
            height: 100vh;
            top: 1vh;
            background-image: url("./assetMario/bg3.png");
            background-size: cover;
        }
    `}function setBgFlow(){document.querySelector("#jump").innerHTML=`
        #bg2{
            position: absolute;
            width: 200vw;
            height: 100vh;
            top: 1vh;
            background-image: url("./assetMario/bg3.png");
            background-size: cover;
            animation: bg2GoLeft 2s linear infinite;
        }
    `}