import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Level } from 'src/app/models/comon.model';
import { MatrixLevelGeneratorService } from 'src/app/service/matrix-level-generator.service';
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
    private gneratorService: MatrixLevelGeneratorService
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
      this.levelFrom.get('code')?.setValue(this.level.code);
    }
  }

  undateDecorator(element: string, formControl: any) {
    let select = document.getElementById(element) as HTMLSelectElement;
    formControl.setValue(Object.assign({}, formControl.value, this.gneratorService.builderDecorator(select.value)));
  }

  setSizeMatrix() {
    const element = document.getElementById('matrixSize') as HTMLSelectElement;
    this.sizeMatrix = parseInt(element.value);
  }

  setSizeCode(id: string) {
    const element = document.getElementById(id) as HTMLSelectElement;
    this.sizeCode = parseInt(element.value);
  }

  generateMatrix() {
    let matrix = this.gneratorService.matrixGen(this.sizeMatrix);
    this.levelFrom.get('matrix')?.setValue(matrix);
    this.matrixPreviw = matrix;
  }

  generateCode(formControl: any) {
    formControl.setValue(this.gneratorService.codeGen(this.sizeCode));
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
