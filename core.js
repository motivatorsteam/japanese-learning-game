
import Mario from "./mario.js";
import Mario2 from "./mario2.js";
import Koopa from "./koopa.js";
import Princess from "./princess.js";
import Goku from "./goku.js";

let score = 0;
//ready step
document.querySelector("#mario").style.display = "none";
document.querySelector("#input").style.display = "none";
document.querySelector("#restart").style.display = "none";
document.querySelector("#menu").style.display = "none";
var a = new Mario();
document.querySelector("#settingtable button").onclick = back_to_ready;
document.querySelector("#guidetable button").onclick = guide_to_ready;
var bestscore = localStorage.getItem("bestfatherscore");
if (bestscore != null){
    document.querySelector("#bestscore").innerHTML = "Best Score: " + bestscore;
}
var arr_value = [1, 60, true];
arr_value[0] = localStorage.getItem("level");
arr_value[1] = localStorage.getItem("time");
arr_value[2] = localStorage.getItem("hira");
function back_to_ready(){
    document.querySelector("#settingtable").style.display = "none";
    arr_value = get_value();
    localStorage.setItem("level", arr_value[0]);// lưu vào bộ nhớ người dùng
    localStorage.setItem("time", arr_value[1]);
    localStorage.setItem("hira", arr_value[2]);
}
function guide_to_ready(){
    document.querySelector("#guidetable").style.display = "none";
}
document.querySelector("#ready").addEventListener("click", ()=>{
    var temp = document.getElementById("choose_main").querySelector("img");
    document.querySelector("#ready").style.display = "none";
    document.querySelector("#score").style.visibility = "visible";
    document.querySelector("#setting").style.display = "none";
    document.querySelector("#guide").style.display = "none";
    document.querySelector("#bestscore").style.display = "none";
    document.getElementById("choose_main").style.display = "none";
    document.querySelector("#mario").style.display = "block";   
    document.querySelector("#input").style.display = "block";
    playbgmusic();
    //chốt nhân vật
    if (temp.src.includes("mario.png")){
        a = new Mario();
    }else if (temp.src.includes("goku.png")){
        a = new Goku();
    }else if (temp.src.includes("princess.png")){
        a = new Princess();
    }else if (temp.src.includes("mario2.png")){
        a = new Mario2();
    }
    document.getElementById("mario").style.bottom = a.bottom;
    document.getElementById("mario").style.left = a.left;
    //tính điểm 
    let time = arr_value[1];
    //xử lý tín hiệu nhận input
    let inputTextTag = document.querySelector("#input").querySelector("input");
    inputTextTag.focus();
    //xử lý koopa
    var b = new Koopa();
    //loop

    let count = 0;
    let countDisplayGun = 0;
    var isExplode = false;
    let isDisplayGun = false;

    let mainInterval = setInterval(()=>{
        //vòng for tần số cao
        //mario chạy
        
        a.renderRun(arr_value);
        //xử lý string input
        inputTextTag.focus();
        var stringInput = inputTextTag.value;
        if(stringInput.length > 3){
            var len = stringInput.length;
            stringInput = inputTextTag.value.substring(len-3, len);
            inputTextTag.value = stringInput;
        }
        //check từ đang xét
        if(stringInput.includes(b.queue[0]) && a.curmario != a.mg){
            //nếu trúng 1 con koopa
            document.getElementById("curscore").textContent = `SCORE: ${++score}`;
            isDisplayGun = true;
            isExplode = true;
            b.queue.shift();
            inputTextTag.value = "";
            stringInput = "";
        }
        if(countDisplayGun <= 7 && isDisplayGun == true){
            a.renderMarioGun(countDisplayGun);
            countDisplayGun++;
            a.playshotmusic();
            if(isExplode ==true){
                document.querySelectorAll(".kpEle")[0].querySelector("img").src = "./assetMario/explode.gif";
                isExplode = false;
                document.querySelectorAll(".kpEle")[0].querySelector("div").textContent = "";
            }
        }else if(a.curmario == a.mg2 || a.curmario == a.mg){
            a.curmario = a.mm0;
            countDisplayGun = 0;
            isDisplayGun = false;
            document.querySelectorAll(".kpEle")[0].remove();
        }
        //vòng for tần số thấp để xuất koopa
        if(count%20==0){
            b.renderRun(arr_value);
        }
        

        //kiểm tra game over
        if(Koopa.returnGameOver() == true){
            a.marioDead();
            document.getElementById("input").remove();
            document.getElementById("score").remove();       
            playdeadmusic();  
            setTimeout(()=>{
                document.querySelector("#restart").style.display = "block";
                document.querySelector("#menu").style.display = "block";
            }, 3000);
            clearInterval(mainInterval);
        }
        
        //for tần số thấp để countdown thời gian
        if(count%10 == 0){
            time--;
            document.getElementById("time").textContent = `TIME LEFT: ${time}s`;
        }
        //xử lý nếu hết tg rồi mà vẫn chưa thua => thắng
        if(time == 0  && Koopa.returnGameOver() == false){
            playwinmusic();
            a.marioWin();
            Koopa.explodeAllKoopa();
            setTimeout(()=>{
                Koopa.deleteAllKoopa();
            }, 1500);
            setTimeout(()=>{
                document.querySelector("#restart").style.display = "block";
                document.querySelector("#menu").style.display = "block";
            }, 3000);
            clearInterval(mainInterval);
        }
        count++;
    }, 100);

})

document.getElementById("restart").onclick = restart;
document.getElementById("menu").onclick = returnToMenu;
function restart(){
    if (score > localStorage.getItem("bestfatherscore")){
        localStorage.setItem("bestfatherscore", score);
    }
    window.location.href = ("indexMario2.html");
}
function returnToMenu(){
    if (score > localStorage.getItem("bestfatherscore")){
        localStorage.setItem("bestfatherscore", score);
    }
    window.location.href = ("index.html");
}


function playwinmusic(){
    document.querySelector("audio").remove();
    var a = document.createElement("audio");
    a.src = "./assetMario/win.mp3";
    a.play();
}
function playdeadmusic(){
    document.querySelector("audio").remove();
    var a = document.createElement("audio");
    a.src = "./assetMario/thua-cuoc.mp3";
    a.play();
}
function playbgmusic(){
    var a = document.querySelector("audio");
    a.play();
}

