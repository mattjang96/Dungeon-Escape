# Dungeon Escape Game

[Live Link](https://dungeon-escape.herokuapp.com/)

Dungeon Escape is a JavaScript and HTML5 canvas based game. Integrates an object-oriented Javascript game structure with the smooth rendering of HTML5 canvas to recreate a classic retro game experience.

Dungeon Escape was designed and implemented within a 5-day timeframe. Regardless, this is still an ongoing project, with more features left to be implemented. 

Thanks for visiting!

![Game](https://s3-us-west-1.amazonaws.com/shuttr-dev-seeds/dungeon.png)

## Gameplay
On your quest to escape the dungeon, monsters stand in your way! 

Slay them for a chance to break for freedom ... or be trapped forever!

## Features 

- Render canvas map & background image
- Create characters: hero and monster, fluid keyboard movement
- Randomly spawning monsters & moving obstacles 
- Import audio: main music & monster death sound
- Timer, and a counter of monsters slain
- Game over messages

## Implementation
### Basic Rendering
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
The game starts off by rendering all of the necessary objects, including the map, characters, timer, etc. 
The `render` function also takes care of the game over situation. If the player has successfully slain 20 or more monsters, they will escape safely. Otherwise, they will prompted to try again.

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
Upon a successful collision, the `update(modifier)` function will call the `reset()` function every time, which randomly places a new monster anywhere within the map:
```javascript
var reset = function () {
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};
```

## Further Improvements

- Different levels with increasing difficulty
- Multiple (moving) enemies 
- Monsters with different type, health, etc.
- Items + Boosts