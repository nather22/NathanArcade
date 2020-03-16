var width = 500;
var height = 400;

var FPS = 60;

var gameState = "menu";

var canvas = document.getElementById('game');
var g = canvas.getContext('2d');

var x = 50;
var y = 50;

var lives = 3;

var coins = [];
var dummyCoins = [];

var player = {
    x: 50,
    y: 50,
    speed: 5,
    score: 0,
    width: 20,
    height: 20,
    tick: function () {
        if (Key.up && this.y > 0) this.y -= this.speed;
        if (Key.down && this.y < height - 20) this.y += this.speed;
        if (Key.left && this.x > 0) this.x -= this.speed;
        if (Key.right && this.x < width - 20) this.x += this.speed;
    },
    render: function () {
        g.fillStyle = 'black';
        g.fillRect(this.x, this.y, this.width, this.height);
    }


};

var Key = {
    up: false,
    down: false,
    left: false,
    right: false,
    space: false,
    enter: false
};

addEventListener("keydown", function (e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.which;
    switch (keyCode) {
        case 38:
            //up
            Key.up = true;
            break;
        case 40:
            //down
            Key.down = true;
            break;
        case 37:
            //left
            Key.left = true;
            break;
        case 39:
            //right
            Key.right = true;
            break;
        case 32:
            Key.space = true;
            break;
        case 13:
            Key.enter = true;
            break;
    }
}, false);
addEventListener("keyup", function (e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.which;
    switch (keyCode) {
        case 38:
            //up
            Key.up = false;
            break;
        case 40:
            //down
            Key.down = false;
            break;
        case 37:
            //left
            Key.left = false;
            break;
        case 39:
            //right
            Key.right = false;
            break;
             case 32:
            Key.space = false;
            break;
             case 13:
            Key.enter = false;
            break;
    }
}, false);
var dummyCoin = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.render = function () {
        g.fillStyle = 'red';
        g.fillRect(this.x, this.y, this.width, this.height);
    };
    this.tick = function () {
        if (collision(this, player)) {
            lives -= 1;
            removeDummyCoin(this);
            console.log(lives);
        }
        if(collision(this, Coin)) {
            this.y--;
        }
        
        
        
    };
};

function initDummyCoin(amount) {
    for (i = 0; i < amount; i++) {
        dummyCoins.push(new dummyCoin(Math.random() * width, Math.random() * height));
    }
}


var Coin = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 8;
    this.height = 8;
    this.render = function () {
        g.fillStyle = 'yellow';
        g.fillRect(this.x, this.y, this.width, this.height);
    };
    this.tick = function () {
        if (collision(this, player)) {
            player.score++;
            removeCoin(this);
        }

    };
};


function removeCoin(coin) {
    var index = coins.indexOf(coin);
    coins.splice(index, 1);
}

function removeDummyCoin(coin) {
    var index = dummyCoins.indexOf(coin);
    dummyCoins.splice(index, 1);
}



function initCoin(amount) {
    for (i = 0; i < amount; i++) {
        coins.push(new Coin(Math.random() * width, Math.random() * height));
    }
}

function collision(obj1, obj2) {
    return (
    obj1.x < obj2.x + obj2.width && 
        obj1.x + obj1.width > obj2.x && 
        obj1.y < obj2.y + obj2.height && 
        obj1.y + obj1.height > obj2.y);
}

function init() {
    if (gameState === "play") {
        initCoin(15);
        initDummyCoin(5);
    }
}

function renderCoins() {
    for (var i in coins) {
        coins[i].render();
    }
}

function renderDummyCoins() {
    for (var i in dummyCoins) {
        dummyCoins[i].render();
    }
}



function render() { 
  g.clearRect(0, 0, width, height);
    
    if (gameState == "play") {
        
        g.font = "bold 20px consolas";
        g.fillStyle = "black";
        g.fillText("score: " + player.score, 2, 20);
        g.fillText("Lives: " + lives, 2, 40);

        player.render();
        renderCoins();
        renderDummyCoins();
    }
    if (gameState === "gameover") {        
        g.font = "bold 100px impact";
        g.fillStyle = "red";
        g.fillText("GameOver", width / 2 - 230, height / 2);
        g.font = "bold 40px impact";
        g.fillStyle = "black";
        g.fillText("Score: " + player.score, width/2-170, height/2+50);
    }
    if (gameState === "menu") {

        g.font = "bold 70px consolas";
        g.fillStyle = "green";
        g.fillText("Get Coin", width/2-70*2-10, height/2);
         g.font = "bold 30px consolas";
        g.fillText("Press Space", width/2-85, height/2 + 50);
        g.fillStyle = "black"
        g.font = "bold 20px consolas";
        g.fillText("Player: ", width/2-200, height/2+100)
        g.fillRect(width/2-120, height/2+85, 20, 20);
        
        g.fillStyle = "black";
         g.fillText("Coins: ", width/2-200, height/2+130)
         g.fillStyle = "yellow";
        g.fillRect(width/2-120, height/2+120, 8, 8);
         
        g.fillStyle = "black";
          g.fillText("Mines: ", width/2-200, height/2+160)
          g.fillStyle = "red";
        g.fillRect(width/2-120, height/2+150, 8, 8);
        
         if(Key.space) {gameState = "play";}       
    }
}

function updateCoins() {
    for (var i in coins) {
        coins[i].tick();
    }
}

function updateDummyCoins() {
    for (var i in dummyCoins) {
        dummyCoins[i].tick();
    }
}


function tick() {
    if (gameState === "play") {
        player.tick();
    
        updateCoins();
        updateDummyCoins();
        if (coins.length <= 0) {
            initDummyCoin(5);
            initCoin(15);
        }
        
        if(lives <= 0) {
            gameState = "gameover";
        }
        
        
    }
    

}

init();
setInterval(function () {
    render();
    tick();
}, 1000 / FPS);