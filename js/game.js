// Declaration of Variables
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);
// var frames = 500,
//   r = setInterval(randMov, frames);

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
    // obsPosition = (obs.x, obs.y);
};
obsImage.src = "images/obstacle.png";

var obs1Ready = false;
var obs1Image = new Image();
obs1Image.onload = function() {
  obs1Ready = true;

  obs1.x = 32 + Math.random() * (canvas.width - 64);
  obs1.y = 32 + Math.random() * (canvas.width - 64);
  // obsPosition = (obs.x, obs.y);
};
obs1Image.src = "images/obstacle.png";

var obs2Ready = false;
var obs2Image = new Image();
obs2Image.onload = function() {
  obs2Ready = true;

  obs2.x = 32 + Math.random() * (canvas.width - 64);
  obs2.y = 32 + Math.random() * (canvas.width - 64);
  // obsPosition = (obs.x, obs.y);
};
obs2Image.src = "images/obstacle.png";

var obs3Ready = false;
var obs3Image = new Image();
obs3Image.onload = function() {
  obs3Ready = true;

  obs3.x = 32 + Math.random() * (canvas.width - 64);
  obs3.y = 32 + Math.random() * (canvas.width - 64);
  // obsPosition = (obs.x, obs.y);
};
obs3Image.src = "images/obstacle.png";

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
    speed: 110
};
var monster = {};
var monsterSlain = 0;
// obstacle declare
var obs = {};
var obs1 = {};
var obs2 = {};
var obs3 = {};


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
    obs.x = 32 + Math.random() * (canvas.width - 64);
    obs.y = 32 + Math.random() * (canvas.width - 64);
    obs1.x = 32 + Math.random() * (canvas.width - 64);
    obs1.y = 32 + Math.random() * (canvas.width - 64);
    obs2.x = 32 + Math.random() * (canvas.width - 64);
    obs2.y = 32 + Math.random() * (canvas.width - 64);
    obs3.x = 32 + Math.random() * (canvas.width - 64);
    obs3.y = 32 + Math.random() * (canvas.width - 64);
};

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
    if (obs1Ready) {
      ctx.drawImage(obs1Image, obs1.x, obs1.y);
    }
    if (obs2Ready) {
      ctx.drawImage(obs2Image, obs2.x, obs2.y);
    }
    if (obs3Ready) {
      ctx.drawImage(obs3Image, obs3.x, obs3.y);
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
            time = 0;
            finished = true; 
            ctx.fillText("You've failed to escape! Try again.", 118, 200);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            gameOver.play();
      }

    if (hero.x <= obs1.x + 32 && obs1.x <= hero.x + 32 &&
      hero.y <= obs1.y + 32 && obs1.y <= hero.y + 32) {
            time = 0;
            finished = true; 
            ctx.fillText("You've failed to escape! Try again.", 118, 200);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            gameOver.play();
      }
    if (hero.x <= obs2.x + 32 && obs2.x <= hero.x + 32 &&
      hero.y <= obs2.y + 32 && obs2.y <= hero.y + 32) {
            time = 0;
            finished = true; 
            ctx.fillText("You've failed to escape! Try again.", 118, 200);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            gameOver.play();
      }

      if (hero.x <= obs3.x + 32 && obs3.x <= hero.x + 32 &&
      hero.y <= obs3.y + 32 && obs3.y <= hero.y + 32) {
            time = 0;
            finished = true; 
            ctx.fillText("You've failed to escape! Try again.", 118, 200);
            mainMusic.pause();
            mainMusic.currentTime = 0;
            gameOver.play();
      }

    if (finished == true && monsterSlain >= 15) {
        ctx.fillText(
          `Congrats, You escaped safely! Rescued: ${monsterSlain} dragons.`,
          55,
          220
        );
        mainMusic.play();
        mainMusic.pause();
        mainMusic.currentTime = 0;
        gameWin.play();
    } else if (finished == true && monsterSlain < 15) {
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
        obs1Ready = false;
        obs2Ready = false;
        obs3Ready = false;
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


