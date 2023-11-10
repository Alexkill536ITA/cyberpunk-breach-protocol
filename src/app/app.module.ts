import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './layout/home/home.component';
import { GameModule } from './layout/game/game.module';
import { BuilderLevelModule } from "./layout/builder-level/builder-level.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routingComponent
  ],
  imports: [
    BrowserModule,
    GameModule,
    BuilderLevelModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
