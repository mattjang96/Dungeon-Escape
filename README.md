# Dungeon Escape Game

Dungeon Escape is a JavaScript and HTML5 canvas based game. Integrates an object-oriented Javascript game structure with the smooth rendering of HTML5 canvas to recreate a classic retro game experience.

Dungeon Escape was designed and implemented within a 4-day timeframe. Regardless, this is still an ongoing project, with more features left to be implemented. 

Thanks for visiting!

[Play Here](https://mattjang96.github.io/Dungeon-Escape/)

![Game](https://s3-us-west-1.amazonaws.com/shuttr-dev-seeds/escape.png)

## Gameplay
On your quest to escape the dungeon, monsters stand in your way! 

But first, you must rescue baby dragons for a chance to break for freedom ... or be trapped forever!

## Technology

Vanilla JavaScript, Web Audio API, HTML5 Canvas, (webpack entry file)

## Features 

- Render canvas map & background image
- Create characters: hero, dragon, and monster, fluid keyboard movement
- Randomly spawning dragons & monsters 
- Import audio: main music, rescue music, game over music
- Timer, and a counter of dragons rescued
- Game over messages

## Implementation
### Basic Rendering
The game starts off by rendering all of the necessary objects, including the map, characters, timer, etc. 
```javascript
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

    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "18px Helvetica";
    ctx.textAlign = "justify";
    ctx.textBaseline = "top";
    ctx.fillText("Monsters slain: " + monsterSlain, 20, 20);
    ctx.fillText("Time: " + time, 20, 50);

    if (finished == true && monsterSlain >= 20) {
        ctx.fillText(`Congrats, You escaped safely! Slayed: ${monsterSlain} monsters.`, 50, 220);mainMusic.play();
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
``` 
The `render()` function also takes care of the game over situation. If the player has successfully rescues 15 or more dragons, they will escape safely. Otherwise, they will prompted to try again.

I've also requested that the game works across different browsers/platforms via the `requestAnimationFrame`.
```javascript
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
```
### Displaying Sound
Music was imported in the following manner:
```javascript
var mainMusic = new Audio("./audio/music.mp3");
mainMusic.loop = true;
mainMusic.volume = 0.3;
```
The `render` function above plays the music that the variable `mainMusic` calls on. Music can be easily controlled through functions like `.play()` and `.pause()`. 

### Movement + Collision Check
To allow player movement, and to check for collision between the player and the monster:
```javascript  
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
```
Upon a successful collision, the `update(modifier)` function will call the `reset()` function every time, which randomly places new monsters anywhere within the map:
```javascript
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
```
The same idea applies to dragons.

## Further Improvements

- Different levels with increasing difficulty
- Multiple (moving) enemies 
- Monsters with different type, health, etc.
- Items + Boosts

Thanks for visiting!
