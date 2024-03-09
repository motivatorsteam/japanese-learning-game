export default class{
    kp1 = "./assetMario/koopa.png";
    curKoopaLeft = window.innerWidth *2;
    kpResult = "";
    queue = [];
    //constructor
    constructor(){};
    //method
    renderRun(arr_value){
        //lấy dữ liệu từ json
        const data = getWords();
        data.then((dt)=>{
            const characters = dt.characters;
            let arr = [];
            characters.forEach(character => {
                arr.push(character);
            });
            if (arr_value[0] == 1) {
                arr = arr.slice(0, 5);
            } else if (arr_value[0] == 2) {
                arr = arr.slice(5, 15);
            } else if (arr_value[0] == 3) {
                arr = arr.slice(15, 25);
            } else if (arr_value[0] == 4) {
                arr = arr.slice(25, 35);
            } else if (arr_value[0] == 5) {
                arr = arr.slice(35, 45);
            } else if (arr_value[0] == 6) {
                arr = arr.slice(45, 55);
            } else if (arr_value[0] == 7) {
                arr = arr.slice(55, 65);
            } else if (arr_value[0] == 8) {
                arr = arr.slice(65, 71);
            }                   
            var indexWord = Math.floor(Math.random()*arr.length);
            //thêm thẻ div bao quanh
            var newKpEle = document.createElement("div");
            newKpEle.className = "kpEle";
            
            //thêm thẻ text
            var newKpText = document.createElement("div");
            newKpText.className = "kpText";
            if (arr_value[2] == true || arr_value[2] == "true"){
                newKpText.innerHTML = arr[indexWord].hiragana;
            }else{
                newKpText.innerHTML = arr[indexWord].katakana;
            }
            this.queue.push(arr[indexWord].romaji);

            //thêm ảnh koopa
            var newKp = document.createElement("img");
            newKp.src = this.kp1;
            newKp.alt = "#";
            newKp.className = "kp";
             
            //lắp ghép
            newKpEle.appendChild(newKpText);
            newKpEle.appendChild(newKp);
            document.getElementById("mainGame").appendChild(newKpEle);
        });
    }

    //hàm gameover nếu chạm vào mario
    static returnGameOver() {
        var koopaArr = document.querySelectorAll(".kpEle");
        var mario = document.querySelector("#mario");
        for(let i=0;i<koopaArr.length;i++){
            //nếu koopa chạm vào mario và khi koopa chưa bị nổ thì sẽ trả về game over.
            if((koopaArr[i].offsetLeft <= (mario.offsetLeft + mario.clientWidth)) && koopaArr[i].querySelector("img").src.includes("/assetMario/koopa.png")){
                return true;
            }
        }
        return false;
    }

    static explodeAllKoopa(){
        //lấy hết tất cả các phần tử koopa và thay nó bằng hiệu ứng nổ.
        var koopaArr = document.querySelectorAll(".kpEle");
        for(let i=0;i<koopaArr.length;i++){
            koopaArr[i].querySelector("img").src = "./assetMario/explode.gif";
            koopaArr[i].querySelector("div").textContent = "";
        }
    }
    static deleteAllKoopa(){
        //xoá tất cả koopa.
        var koopaArr = document.querySelectorAll(".kpEle");
        for(let i=0;i<koopaArr.length;i++){
            koopaArr[i].remove();
        }
    }
}

async function getWords() {
    const response = await fetch("./kana.json");
    return await response.json(); // trả về 1 promise nên phải dùng .then để truy cập
}


