# Dungeon Escape Game

[Live Link](https://dungeon-escape.herokuapp.com/)

Dungeon Escape is a JavaScript and HTML5 canvas based game. Integrates an object-oriented Javascript game structure with the smooth rendering of HTML5 canvas to recreate a classic retro game experience.

Dungeon Escape was designed and implemented within a 5-day timeframe. Regardless, this is still an ongoing project, with more features left to be implemented. 

Thanks for visiting!

![Game](https://s3-us-west-1.amazonaws.com/shuttr-dev-seeds/dungeon.png)

## Gameplay
On your quest to escape the dungeon, monsters stand in your way! 

Slay them for a chance to break for freedom ... or be trapped forever!

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


## Features 

- Render canvas map & background image
- Create characters: hero and monster, fluid keyboard movement
- Randomly spawning monsters & moving obstacles 
- Import audio: main music & monster death sound
- Timer, and a counter of monsters slain
- Game over messages

## Coming Soon

- Different levels with increasing difficulty
- Multiple (moving) enemies 
- Monsters with different type, health, etc.
- Items + Boosts
