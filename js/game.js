// Create the canvas for the game to display in
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

// var mainTheme = new Audio("oof.mp3");
// mainTheme.loop = true;
// mainTheme.volume = 0.5;
// mainTheme.play();

var monsterDie = new Audio("./audio/oof.mp3");
monsterDie.volume = 0.6;

// Load the background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    // show the background image
    bgReady = true;
};
bgImage.src = "images/background.png";

// Load the hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    // show the here image
    heroReady = true;
};
heroImage.src = "images/hero.png";

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

// Reset the player and monster positions when player catches a monster
var reset = function () {
    // Reset player's position to centre of canvas
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
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
    // Check if player and monster collider
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
    ) {
        monsterDie.pause();
        monsterDie.currentTime = 0;
        monsterDie.play();
        ++monstersCaught;
        reset();
    }
};

// Draw everything on the canvas
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    // Display score and time 
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "20px Helvetica";
    ctx.textAlign = "justify";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters caught: " + monstersCaught, 20, 20);
    ctx.fillText("Time: " + count, 20, 50);
    // Display game over message when timer finished
    if (finished == true && monstersCaught >= 15) {
        ctx.fillText("Congrats, You escaped safely!", 120, 220);
    } else if(finished == true && monstersCaught < 15) {
        ctx.fillText("You've failed to escape! Try again.", 110, 200);
    }

};
var count = 30; // how many seconds the game lasts for - default 30
var finished = false;
var counter = function () {
    count = count - 1; // countown by 1 every second
    // when count reaches 0 clear the timer, hide monster and
    // hero and finish the game
    if (count <= 0) {
        // stop the timer
        clearInterval(counter);
        // set game to finished
        finished = true;
        count = 0;
        // hider monster and hero
        monsterReady = false;
        heroReady = false;
    }
}

// timer interval is every second (1000ms)
setInterval(counter, 1000);
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