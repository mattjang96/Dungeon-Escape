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
gameOver.volume = 0.5;

var monsterSound = new Audio("./audio/monsterSound.mp3");
monsterSound.volume = 0.6;

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    // show the background image
    bgReady = true;
};
bgImage.src = "images/background.png";

// Load the hero image
var charReady = false;
var charImage = new Image();
charImage.onload = function () {
    // show the hero image
    charReady = true;
    // show the hero at the center of the map @ start of the game
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
};
charImage.src = "images/hero.png";

// Load the monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    // show the monster image
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Create the game objects
var hero = {
    speed: 120 // movement speed of hero in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};
// Check for keys pressed where key represents the keycode captured
addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
}, false);
addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
}, false);

// Reset the onster positions when player catches a monster
var reset = function () {
    // Place the monster somewhere on the canvas randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));

};

// Update game objects - change player position based on key pressed
var update = function (modifier) {
    if (38 in keysDown) { // Player is holding up key
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player is holding down key
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player is holding left key
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player is holding right key
        hero.x += hero.speed * modifier;
    }
    // Check if player and monster collide
    if (
        hero.x <= (monster.x + 32) && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32) && monster.y <= (hero.y + 32)
    ) {
        monsterSound.pause();
        monsterSound.currentTime = 0;
        monsterSound.play();
        ++monstersCaught;
        reset();
    }
};

// Draw everything on the canvas
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
    // Display score and time 
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "justify";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters slain: " + monstersCaught, 20, 20);
    ctx.fillText("Time: " + time, 20, 50);
    // Display game over message when timer finished
    if (finished == true && monstersCaught >= 18) {
        ctx.fillText(`Congrats, You escaped safely! Slayed: ${monstersCaught} monsters.`, 50, 220);mainMusic.play();
        mainMusic.pause();
        gameOver.play();
    } else if(finished == true && monstersCaught < 18) {
        ctx.fillText("You've failed to escape! Try again.", 118, 200);
        mainMusic.pause();
        gameOver.play();
    }

};
var time = 35; // how many seconds the game lasts for - default 30
var finished = false;
var timer = function () {
    time = time - 1; // timeown by 1 every second
    // when time reaches 0 clear the timer, hide monster and
    // hero and finish the game
    if (time <= 0) {
        // stop the timer
        clearInterval(timer);
        // set game to finished
        finished = true;
        time = 0;
        // hide monster and hero
        monsterReady = false;
        charReady = false;
    }
}

// timer interval is every second (1000ms)
setInterval(timer, 1000);
// The main game loop
var main = function () {
    // run the update function
    update(0.02); // do not change
    // run the render function
    render();
    // Request to do this again ASAP
    requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
// Let's play this game!
reset();
main();

