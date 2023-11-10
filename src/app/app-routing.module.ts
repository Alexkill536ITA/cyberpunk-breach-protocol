import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "../app/layout/home/home.component";
import { GameComponent } from "../app/layout/game/game.component";
import { BuilderLevelComponent } from "../app/layout/builder-level/builder-level.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "game", component:  GameComponent},
  { path: "editorlevel", component:  BuilderLevelComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent = [HomeComponent,]
