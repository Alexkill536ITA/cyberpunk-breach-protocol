import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MakerLevelComponent } from "./maker-level.component";


@NgModule({
  declarations: [
    MakerLevelComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MakerLevelComponent
  ]
})
export class MakerLevelModule { }
