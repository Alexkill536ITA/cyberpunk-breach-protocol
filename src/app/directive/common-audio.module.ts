import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HoverSoundPlayDirective } from "./hover-sound-play.directive";
import { ClickSoundPlayDirective } from "./click-sound-play.directive";


@NgModule({
  declarations: [
    HoverSoundPlayDirective,
    ClickSoundPlayDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HoverSoundPlayDirective,
    ClickSoundPlayDirective
  ]
})
export class AudioControlMolude { }
