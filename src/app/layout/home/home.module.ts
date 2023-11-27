import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeComponent } from "./home.component";
import { AudioControlMolude } from "../../directive/common-audio.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AudioControlMolude
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
