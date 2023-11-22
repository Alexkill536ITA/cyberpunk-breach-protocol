import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Level } from 'src/app/models/comon.model';
import { LevelGeneratorService } from 'src/app/service/level-generator.service';
import { MatrixGeneratorService } from 'src/app/service/matrix-generator.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-maker-level',
  templateUrl: './maker-level.component.html',
  styleUrls: ['./maker-level.component.scss']
})
export class MakerLevelComponent implements OnInit {
  public onClose: Subject<Level> = new Subject<Level>;

  @Input() level!: Level;

  levelFrom!: FormGroup;

  challenge(): FormGroup {
    return this.fb.group({
      id: this.fb.control('challenge-1', Validators.required),
      size: this.fb.control('2', Validators.required),
      row: this.fb.control([], Validators.required),
      read: this.fb.control(0),
      resolve: this.fb.control(false),
      fail: this.fb.control(false),
      decorator: this.fb.group({
        logo: this.fb.control('./assets/img/Code-Tier-1.png'),
        logoResolve: this.fb.control('./assets/img/Code-Tier-1-resolve.png'),
        logofail: this.fb.control('./assets/img/Code-Tier-1-fail.png'),
        title: this.fb.control('DATAMINE_V1', Validators.required),
        description: this.fb.control('Base Data', Validators.required)
      })
    });
  }

  get code() {
    return this.levelFrom.controls["code"] as FormArray;
  }

  sizeMatrix: number = 4;
  sizeCode: number = 2;

  matrixPreviw: any;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder,
    private matrixGneratorService: MatrixGeneratorService,
    private levelGneratorService: LevelGeneratorService
  ) { }

  ngOnInit(): void {
    this.levelFrom = this.fb.group({
      id: this.fb.control(uuidv4(), Validators.required),
      name: this.fb.control('', [Validators.required]),
      timeLeft: this.fb.control(30, [Validators.required, Validators.min(10), Validators.max(120)]),
      bufferSize: this.fb.control(4, [Validators.required, Validators.min(4), Validators.max(16)]),
      matrix: this.fb.control(Validators.required),
      code: this.fb.array([
        this.challenge()
      ]),
    });

    if (this.level) {
      this.levelFrom.get('id')?.setValue(this.level.id);
      this.levelFrom.get('name')?.setValue(this.level.name);
      this.levelFrom.get('timeLeft')?.setValue(this.level.timeLeft);
      this.levelFrom.get('bufferSize')?.setValue(this.level.bufferSize);
      this.levelFrom.get('matrix')?.setValue(this.level.matrix);
      this.matrixPreviw = this.level.matrix;
      this.code.clear();
      this.level.code.forEach((code) => {
        let temp = this.challenge();
        temp.get('id')?.setValue(code.id);
        temp.get('size')?.setValue(code.size);
        temp.get('row')?.setValue(code.row);
        temp.get('decorator')?.get('logo')?.setValue(code.decorator.logo);
        temp.get('decorator')?.get('logoResolve')?.setValue(code.decorator.logoResolve);
        temp.get('decorator')?.get('logofail')?.setValue(code.decorator.logofail);
        temp.get('decorator')?.get('title')?.setValue(code.decorator.title);
        temp.get('decorator')?.get('description')?.setValue(code.decorator.description);
        this.code.push(temp);
      });
    }
  }

  updateDecorator(element: string, formControl: any) {
    let select = document.getElementById(element) as HTMLSelectElement;
    formControl.setValue(Object.assign({}, formControl.value, this.levelGneratorService.builderDecorator(select.value)));
  }

  setSizeMatrix() {
    const element = document.getElementById('matrixSize') as HTMLSelectElement;
    this.sizeMatrix = parseInt(element.value);
  }

  getSizeCode() {
    let sizeCode = [];
    let codes = this.levelFrom.get('code') as FormArray;
    for (let index = 0; index < codes.length; index++) {
      sizeCode.push(parseInt(codes.at(index).get('size')?.value));
    }
    return sizeCode;
  }

  setRowCode(sequences: any[]) {
    let codes = this.levelFrom.get('code') as FormArray;
    for (let index = 0; index < codes.length; index++) {
      codes.at(index).get('row')?.setValue(sequences[index]);
    }
  }

  generate() {
    let res = this.matrixGneratorService.generate(this.levelFrom.get('bufferSize')?.value, this.sizeMatrix, this.getSizeCode());
    this.levelFrom.get('matrix')?.setValue(res.matrix);
    this.matrixPreviw = res.matrix;
    this.setRowCode(res.sequences);
  }

  addChallenge() {
    let challenge = this.challenge();
    const length = this.levelFrom.get('code')?.getRawValue().length;
    if (length < 6) {
      challenge.get('id')?.setValue('challenge-' + (length + 1));
      this.code.push(challenge);
    }
  }

  clearChallenge(id: string, formControl: any) {
    formControl.get('row').reset();
    formControl.get('decorator').get('logo').setValue('./assets/img/Code-Tier-1.png');
    formControl.get('decorator').get('logoResolve').setValue('./assets/img/Code-Tier-1-resolve.png');
    formControl.get('decorator').get('logofail').setValue('./assets/img/Code-Tier-1-fail.png');
    formControl.get('decorator').get('title').setValue('DATAMINE_V1');
    formControl.get('decorator').get('description').setValue('Base Data');
    let elemnt = document.getElementById(id) as HTMLSelectElement;
    elemnt.value = 'DATAMINE_V1';
  }

  removeChallenge(index: number) {
    const control = <FormArray>this.levelFrom.controls['code'];
    control.removeAt(index);
  }

  submit() {
    this.level = this.levelFrom.getRawValue();
    this.onClose.next(this.level);
    this.modal.dismiss();
  }
}
