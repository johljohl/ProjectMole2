import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { GameInterface } from '../gameInterface'; // the game interface
import { Hole } from '../hole'; // the hole interface

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.css'],
})
export class GameboardComponent implements OnInit {
  holes: Hole[];
  gameInterface: GameInterface;

  constructor(private boardService: BoardService) {
    this.holes = [];
    this.gameInterface = {
      score: 0,
      time: 60, // Change this if you want more time!
      start: false,
      highscore: 0, // highscore always starts at 0 when the site is reloaded
      gameOver: '©1984 NINTENDO',
      buttonOff: false,
    };
  }
  ngOnInit(): void {
    this.holes = this.boardService.gameLoop(); // the gameloop generates holes onload!
  }

  startGame(): void {
    this.boardService.startAudio(); // A intro for 7 seconds play everytime you start the game
    this.gameInterface.buttonOff = true; // Locks the button during gameplay

    this.gameInterface.gameOver = 'GET READY'; // Gets the player ready notification

    setTimeout(() => {
      if (this.gameInterface.start === true) return;
      this.gameInterface.score = 0; //
      let game = this.boardService.randomHole(this.holes, this.gameInterface);
      let counter = this.boardService.startCounter(this.gameInterface);

      let statusCheck = this.boardService.statusCheck(
        game,
        counter,
        this.gameInterface
      );

      this.gameInterface.start = true;
      this.gameInterface.gameOver = 'GO!';
    }, 7000); // Seven seconds timer
  }
  bonk(hole: Hole): void {
    // This is the event handler for the game

    if (this.gameInterface.start && hole.theHole) {
      this.boardService.playEffect(); // Plays an effect everytime you score
      hole.theHole = false; // Removes the Character Doug!
      this.gameInterface.score++; // Adds a point to the scoreboard

      if (this.gameInterface.score > this.gameInterface.highscore) {
        // Shows todays highscore!
        this.gameInterface.highscore = this.gameInterface.score;
      }
    }
  }
}
