import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from "primeng/table";
import { MatrixListShowComponent } from "./matrix-list-show.component";



@NgModule({
  declarations: [
    MatrixListShowComponent
  ],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [
    MatrixListShowComponent
  ]
})
export class MatrixListShowModule { }
