import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BoardService } from './board.service';

import { AppComponent } from './app.component';
import { GameboardComponent } from './gameboard/gameboard.component';

@NgModule({
  declarations: [AppComponent, GameboardComponent],
  imports: [BrowserModule],
  providers: [BoardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
