import { Component, OnInit } from '@angular/core';
import { BoardService } from '../board.service';
import { GameInterface } from '../gameInterface';
import { Hole } from '../hole';

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
      time: 60,
      start: false,
      buttonOff: false,
    };
  }
  ngOnInit(): void {
    this.holes = this.boardService.gameLoop();
  }

  startGame(): void {
    if (this.gameInterface.start === true) return;
    this.gameInterface.score = 0;
    let game = this.boardService.startGame(this.holes, this.gameInterface);
    let counter = this.boardService.startCounter(this.gameInterface);

    let statusCheck = this.boardService.statusCheck(
      game,
      counter,
      this.gameInterface
    );

    this.gameInterface.start = true;
  }
  bonk(hole: Hole): void {
    if (this.gameInterface.start && hole.theHole) {
      this.boardService.playEffect(); // Plays a effect when you score
      hole.theHole = false;
      this.gameInterface.score++; // Adds a point to the scoreboard
    }
  }
}
