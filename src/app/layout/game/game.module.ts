import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { ScriptAnimationsModule } from "../../modules/script-animations/script-animations.module";
import { HoverBoxCodeDirective } from "../../directive/hover-box-code.directive";


@NgModule({
  declarations: [
    GameComponent,
    HoverBoxCodeDirective
  ],
  imports: [
    CommonModule,
    ScriptAnimationsModule,
    RouterModule
  ],
  exports: [
    GameComponent
  ]
})
export class GameModule { }
