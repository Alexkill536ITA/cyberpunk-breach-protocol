import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakerLevelComponent } from "./maker-level.component";
import { AudioControlMolude } from 'src/app/directive/common-audio.module';


@NgModule({
  declarations: [
    MakerLevelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AudioControlMolude
  ],
  exports: [
    MakerLevelComponent
  ]
})
export class MakerLevelModule { }
