import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game.component';
import { ScriptAnimationsModule } from "../../modules/script-animations/script-animations.module";



@NgModule({
  declarations: [
    GameComponent
  ],
  imports: [
    CommonModule,
    ScriptAnimationsModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
