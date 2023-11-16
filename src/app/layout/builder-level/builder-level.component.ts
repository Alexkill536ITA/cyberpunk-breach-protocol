import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Level } from 'src/app/models/comon.model';
import { MakerLevelComponent } from "../../modules/maker-level/maker-level.component";


@Component({
  selector: 'app-builder-level',
  templateUrl: './builder-level.component.html',
  styleUrls: ['./builder-level.component.scss']
})
export class BuilderLevelComponent implements OnInit {

  levels: Level[] = [];

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.loadLevels();
  }

  loadLevels() {
    let temp = localStorage.getItem('levelsDB') ? localStorage.getItem('levelsDB') : <any>[];
    this.levels = temp.length > 0 ? <Level[]>JSON.parse(temp) : temp;
  }

  openModalNewOrEdit(level?: Level) {
    const modalMakerLevel = this.modalService.open(MakerLevelComponent, { centered: true, size: 'xl' });
    if (level) {
      modalMakerLevel.componentInstance.level = level;
    }

  }
}
