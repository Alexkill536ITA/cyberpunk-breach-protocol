import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './layout/home/home.module';
import { GameModule } from './layout/game/game.module';
import { BuilderLevelModule } from "./layout/builder-level/builder-level.module";
import { AudioControlMolude } from './directive/common-audio.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    BuilderLevelModule,
    AppRoutingModule,
    HomeModule,
    AudioControlMolude
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
