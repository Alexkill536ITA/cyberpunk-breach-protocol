import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderLevelComponent } from "./builder-level.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { MakerLevelModule } from "../../modules/maker-level/maker-level.module";
import { MatrixListShowModule } from "../../modules/matrix-list-show/matrix-list-show.module";



@NgModule({
  declarations: [
    BuilderLevelComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MatrixListShowModule,
    MakerLevelModule
  ],
  exports: [
    BuilderLevelComponent
  ]
})
export class BuilderLevelModule { }
