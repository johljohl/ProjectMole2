import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { GameboardComponent } from './gameboard/gameboard.component';
import { BoardService } from './board.service';

@NgModule({
  declarations: [AppComponent, ScoreboardComponent, GameboardComponent],
  imports: [BrowserModule],
  providers: [BoardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
