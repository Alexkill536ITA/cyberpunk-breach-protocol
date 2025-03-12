import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ElectronAction, Level } from 'src/app/models/comon.model';
import { MakerLevelComponent } from "../../modules/maker-level/maker-level.component";
import { ControlerSqllite3Service } from 'src/app/service/controler-sqllite3.service';


@Component({
    selector: 'app-builder-level',
    templateUrl: './builder-level.component.html',
    styleUrls: ['./builder-level.component.scss'],
    standalone: false
})
export class BuilderLevelComponent implements OnInit {

  levels: Level[] = [];

  constructor(
    private modalService: NgbModal,
    private controlerSqllite3Service: ControlerSqllite3Service
  ) { }

  ngOnInit(): void {
    this.loadLevels();
  }

  loadLevels() {
    this.controlerSqllite3Service.invokeAction(ElectronAction.FINDALL).then((result) => {
      let data = JSON.parse(result);
      let temp: Level[] = [];
      if (data.length > 0) {
        data.forEach((element: any) => {
          temp.push(JSON.parse(element.level));
        });
      }
      this.levels = temp;
    }).catch((err) => {
      console.error(err);
    });
  }

  addItem(level: Level): void {
    this.controlerSqllite3Service.invokeAction(ElectronAction.ADDLEVEL, level).then((result) => {
      console.log('pas add ' + result);
    }).finally(() => {
      setTimeout(() => {
        this.loadLevels();
      }, 100);
    });
  }

  updateItem(level: Level): void {
    this.controlerSqllite3Service.invokeAction(ElectronAction.UPDATELEVEL, level).then((result) => {
      console.log('pas update ' + result);
    }).finally(() => {
      setTimeout(() => {
        this.loadLevels();
      }, 100);
    });
  }

  deleteItem(id: string): void {
    this.controlerSqllite3Service.invokeAction(ElectronAction.DELETELEVEL, id).then((result) => {
      console.log('pas delete ' + result);
    }).finally(() => {
      setTimeout(() => {
        this.loadLevels();
      }, 100);
    });
  }

  openModalNewOrEdit(level?: Level) {
    const modalMakerLevel = this.modalService.open(MakerLevelComponent, { centered: true, size: 'xl' });
    if (level) {
      modalMakerLevel.componentInstance.level = level;
    }
    modalMakerLevel.componentInstance.onClose.subscribe((result: Level) => {
      console.log('results', result);
      if (level && level.id == result.id) {
        this.updateItem(result);
      } else {
        this.addItem(result);
      }
    });
  }
}
