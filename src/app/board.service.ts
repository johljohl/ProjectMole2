import { Injectable } from '@angular/core';
import { GameInterface } from './gameInterface';
import { Hole } from './hole';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor() {}

  public gameLoop(): Hole[] {
    let holes = [];
    for (let i = 0; i < 25; i++) {
      holes.push({ id: i, theHole: false });
    }
    return holes;
  }

  public playEffect() {
    // This is the audio for the Eventhandler
    let audio = new Audio();
    audio.src = '../../assets/sound/duck-caught.mp3';
    audio.load();
    audio.play();
  }

  public startGame(
    holes: Hole[],
    gameInterface: GameInterface
  ): ReturnType<typeof setInterval> {
    const game = setInterval(() => {
      let i = Math.floor(Math.random() * 25);

      let hole = holes[i];
      hole.theHole = true;

      setTimeout(() => {
        hole.theHole = false;
      }, 900);
    }, 700);

    return game;
  }
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
  public endGame(
    counter: ReturnType<typeof setInterval>,
    game: ReturnType<typeof setInterval>,
    gameInterface: GameInterface
  ): void {
    clearInterval(game);
    clearInterval(counter);

    gameInterface.time = 60;
    gameInterface.start = false;
    gameInterface.buttonOff = false;
  }
}
