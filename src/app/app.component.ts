import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<h1>Whack-a-duck!</h1>
    <app-gameboard></app-gameboard>`,

  styles: [
    `
      h1 {
        text-align: center;
        font-size: 50px;
        line-height: 1;
        margin-bottom: 0;
        font-family: 'duck-hunt-regular', sans-serif;
        color: skyblue;
        letter-spacing: 5px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'Whack-a-Duck';
}
