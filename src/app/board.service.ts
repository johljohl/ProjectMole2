import { Injectable } from '@angular/core';
import { GameInterface } from './gameInterface'; // The game interface
import { Hole } from './hole'; // The hole interface

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  //---The Game engine----------

  public gameLoop(): Hole[] {
    // The game loop that generates the 25 holes!
    let holes = [];
    for (let i = 0; i < 25; i++) {
      holes.push({ id: i, theHole: false });
    }
    return holes;
  }

  public randomHole(
    holes: Hole[],
    gameInterface: GameInterface
  ): ReturnType<typeof setInterval> {
    const game = setInterval(() => {
      let i = Math.floor(Math.random() * 25); // Picks a random hole

      let hole = holes[i];
      hole.theHole = true;

      setTimeout(() => {
        hole.theHole = false;
      }, 900);
    }, 700); // change the speed and multiplies the character of Doug!

    return game;
  }

  //--- Audio and Sound --------------------------------

  public startAudio() {
    // This audio plays for 7 seconds when the user clicks on the startbutton
    let audio = new Audio();
    audio.src = '../../assets/sound/duck-hunt-intro.mp3'; // This audio  can be change if you want to!
    audio.load();
    audio.play();
  }

  public playEffect() {
    // This is the games effect!!
    let audio = new Audio();
    audio.src = '../../assets/sound/duck-caught.mp3'; // This audio  can be change if you want to!
    audio.load();
    audio.play();
  }

  public gameOverAudio() {
    // This audio plays for 5 seconds at the end of the game!
    let audio = new Audio();
    audio.src = '../../assets/sound/gameover.mp3'; // This audio  can be change if you want to!
    audio.load();
    audio.play();
  }

  //--The timer function-----

  public startCounter(
    gameInterface: GameInterface
  ): ReturnType<typeof setInterval> {
    const counter = setInterval(() => {
      gameInterface.time--;
    }, 1000);

    return counter;
  }
  public statusCheck(
    game: ReturnType<typeof setInterval>,
    counter: ReturnType<typeof setInterval>,
    gameInterface: GameInterface
  ) {
    const gameCheck = setInterval(() => {
      if (gameInterface.time < 1) {
        this.endGame(game, counter, gameInterface);
      }
    }, 1000);

    return gameCheck;
  }

  //--The endGame function--

  public endGame(
    counter: ReturnType<typeof setInterval>,
    game: ReturnType<typeof setInterval>,
    gameInterface: GameInterface
  ): void {
    clearInterval(game);
    clearInterval(counter); // clears the interval
    gameInterface.gameOver = 'GAME OVER';
    gameInterface.time = 60; // reset the timer to 60 seconds
    gameInterface.start = false;
    this.gameOverAudio(); // Game Over audio is playing 5 seconds
    setTimeout(() => {
      gameInterface.gameOver = '©1984 NINTENDO';
      gameInterface.buttonOff = false; // Unlocks the button after gameplay  and audio has finished
    }, 8000);
  }
}
