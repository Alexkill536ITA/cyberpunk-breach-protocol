import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuilderLevelComponent } from "./builder-level.component";
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { MakerLevelModule } from "../../modules/maker-level/maker-level.module";
import { MatrixListShowModule } from "../../modules/matrix-list-show/matrix-list-show.module";
import { RouterModule } from '@angular/router';
import { ControlerSqllite3Service } from 'src/app/service/controler-sqllite3.service';


@NgModule({
  declarations: [
    BuilderLevelComponent
  ],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    MatrixListShowModule,
    MakerLevelModule,
    RouterModule
  ],
  exports: [
    BuilderLevelComponent
  ],
  providers: [
    ControlerSqllite3Service
  ]
})
export class BuilderLevelModule { }
