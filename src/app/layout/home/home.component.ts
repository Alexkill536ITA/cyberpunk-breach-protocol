import { Component } from '@angular/core';
import { ControlerSqllite3Service } from "../../service/controler-sqllite3.service";
import { ElectronAction } from 'src/app/models/comon.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent {

  constructor(
    private ipc: ControlerSqllite3Service
  ) { }

  exitApp() {
    console.log('trigger quit')
    this.ipc.invokeAction(ElectronAction.QUIT, null);
  }
}
