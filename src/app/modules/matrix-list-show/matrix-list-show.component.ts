import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-matrix-list-show',
    templateUrl: './matrix-list-show.component.html',
    styleUrls: ['./matrix-list-show.component.scss'],
    standalone: false
})
export class MatrixListShowComponent {

  @Input() value: any[]= [];

}
