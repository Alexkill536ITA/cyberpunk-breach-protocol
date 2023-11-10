import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
