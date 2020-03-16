let frames = 30;
let names = document.getElementsByClassName("linkText");
let jumbotron = document.getElementById("screen");
let stars = [];
let bG = document.getElementById("background").getContext("2d");

function getRandomColor() {
    let letters = "1234567890ABCDF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

function Star(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.ceil(Math.random() * 4) + 1;
    this.render = function () {
        bG.fillStyle = getRandomColor();
        bG.fillRect(this.x, this.y, this.size, this.size);
    };
    this.update = function () {
        this.y ++;
        if (this.y > 2000 + 5) {
            var index = stars.indexOf(this);
            stars.splice(index, 1);
            return;
        }
    };
}

function createStars(amount) {
    for (i = 0; i < amount; i++) {
        stars.push(new Star(Math.random() * 2000, -5));
    }
}

function initStars(amount) {
    for(i = 0; i < amount; i++){
        stars.push(new Star(Math.random() * 2000, Math.random() * 1000));
    }    
}

function changeColorMouseOver(){
    for(let i=0; i<names.length; i++){
        names[i].style.color = getRandomColor();
    }
}

function changeColorBack(){
    for(let i=0; i<names.length; i++){
        names[i].style.color = "black";
    }
}

setInterval(function(){
    bG.clearRect(0, 0, 2000, 2000);
    createStars(1)
    for(var i in stars) stars[i].render();
    for(var i in stars) stars[i].update();
}, 1000/60);
initStars(400);