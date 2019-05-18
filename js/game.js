// Declaration of Variables
var frames = 500;
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);


var mainMusic = new Audio("./audio/music.mp3");
mainMusic.loop = true;
mainMusic.volume = 0.4;


var gameOver = new Audio("./audio/gameOver.mp3");
gameOver.loop = true;
gameOver.volume = 0.4;


var gameWin = new Audio("./audio/gameWin.mp3");
gameWin.loop = true;
gameWin.volume = 0.4;


var monsterSound = new Audio("./audio/monsterSound.mp3");
monsterSound.volume = 0.5;


var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// declare obstacle
var obsReady = false;
var obsImage = new Image();
obsImage.onload = function() {
    obsReady = true;

    obs.x = 32 + Math.random() * (canvas.width - 64);
    obs.y = 32 + Math.random() * (canvas.width - 64);
};
obsImage.src = "images/obstacle.png";

// declare hero
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
    charReady = true;

    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
};
charImage.src = "images/hero.png";

// declare baby dragon
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";


// Game Logic
var hero = {
    speed: 125 
};
var monster = {};
var monsterSlain = 0;
// obstacle declare
var obs = {
    speed: 125
};


var keysDown = {};
addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
}, false);


var reset = function () {
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// // obstacle random move function
// var randMov = function () {
//     var randDirection = Math.floor(Math.random() * 4 + 1);
//     switch(randDirection) {
//         case 1: {
//             // if (obsY < rowCount && newPosition !== obsPosition) {
//                 obsY++;
//             // }
//             break;
//         }
//         case 2: {
//             // if (obsY > 1 && newPosition !== obsPosition) {
//                 obsY--;
//             // }
//             break;
//         }
//         case 3: {
//             // if (obsX < columnCount && newPosition !== obsPosition) {
//                 obsX++;
//             // }
//             break;
//         }
//         case 4: {
//             // if (obsX > 1 && newPosition !== obsPosition) {
//                 obsX--;
//             }
//             // break;
//         }
// };

var update = function (modifier) {
    if (38 in keysDown) {
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { 
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) {
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { 
        hero.x += hero.speed * modifier;
    }

    if (
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ) {
        monsterSound.pause();
        monsterSound.currentTime = 0;
        monsterSound.play();
        ++monsterSlain;
        reset();
    }
};

// Rendering
var render = function () {
    mainMusic.play(); // cue the music!
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (charReady) {
        ctx.drawImage(charImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    // obstacle render
    if (obsReady) {
        ctx.drawImage(obsImage, obs.x, obs.y);
    }

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "justify";
    ctx.textBaseline = "top";
    ctx.fillText("Dragons Rescued: " + monsterSlain, 20, 20);
    ctx.fillText("Time: " + time, 20, 50);

    // if collide with obstacle, instant game over
    if (hero.x <= obs.x + 32 && obs.x <= hero.x + 32 &&
      hero.y <= obs.y + 32 && obs.y <= hero.y + 32) {
            finished = true; 
            time = 0;
            ctx.fillText("You've failed to escape! Try again.", 118, 200);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            gameOver.play();
      }

    if (finished == true && monsterSlain >= 20) {
        ctx.fillText(
          `Congrats, You escaped safely! Slayed: ${monsterSlain} monsters.`,
          55,
          220
        );
        mainMusic.play();
        mainMusic.pause();
        mainMusic.currentTime = 0;
        gameWin.play();
    } else if (finished == true && monsterSlain < 20) {
        ctx.fillText("You've failed to escape! Try again.", 118, 200);
        mainMusic.pause();
        mainMusic.currentTime = 0;
        gameOver.play();
      }

};

var time = 35; 
var finished = false;
var timer = function () {
    time = time - 1; 

    if (time <= 0) {

        clearInterval(timer);

        finished = true;
        time = 0;

        monsterReady = false;
        charReady = false;
        obsReady = false;
    }
}


setInterval(timer, 1000);
// setInterval(randMov, frames);

var main = function () {

    update(0.02); 

    render();

    requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

reset();
main();


