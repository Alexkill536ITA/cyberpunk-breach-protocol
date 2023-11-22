import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge, Level, Matrix } from 'src/app/models/comon.model';
import { LevelGeneratorService } from 'src/app/service/level-generator.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  notRun = true;
  interval: any;
  progresBar: number = 100;
  positionReadBuffer: number = 0;
  marixReadHistoy: string = 'col';
  sesolveRegister: number = 0;
  failRegister: number = 0;
  splashWinsOrFail: string | null = null;
  splashWinsOrFailText: string = 'Uploaded Demons Failed';
  difficulty: number = 0;
  lastLevel: Level | null = null;

  matrix: Matrix[][] = [[]];
  code: Challenge[] = [];
  buffer: any[] = [];
  bufferSize: number = 8;
  timeLeft: string = '30';
  milliseconds: number = 0;

  id: string;
  level!: Level;

  constructor(
    private levelGeneratorService: LevelGeneratorService,
    private router: Router
  ) {
    const input = this.router.getCurrentNavigation()?.extras.state;
    if (input) {
      this.id = input['id'];
      this.level = input['level'];
    } else {
      this.id = 'auto';
    }
  }

  ngOnInit(): void {
    this.loaderLevel(this.id);
  }

  loaderLevel(id: string, lastLevel?: Level | null) {
    if (lastLevel) {
      this.level = lastLevel;
    } else if (id == 'auto') {
      this.level = this.levelGeneratorService.autoLevel(this.difficulty);
    }

    this.lastLevel = structuredClone(this.level);

    if (this.level == null) {
      console.error('Not Found Level: ' + id)
    } else {
      this.matrix = this.level.matrix;
      this.code = this.level.code;
      this.bufferSize = this.level.bufferSize;
      this.timeLeft = this.level.timeLeft
    }

    for (let index = 0; index < this.bufferSize; index++) {
      this.buffer.push({ value: null, focused: false, resolve: false });
    }
  }

  startTimer() {
    if (this.notRun) {
      this.notRun = false;
      const tempMax = parseInt(this.timeLeft);
      this.milliseconds = parseInt(this.timeLeft) * 1000;
      this.interval = setInterval(() => {
        if (this.milliseconds > 0) {
          this.milliseconds -= 10;
          const sec = (this.milliseconds / 1000) % 1000;
          this.timeLeft = String(sec.toFixed(2));
          this.progresBar = (tempMax / 100) * (sec * 10);
        } else {
          this.checkWins(true, 'Time out');
        }
      }, 10);
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.notRun = true
  }

  pushSelectValue(id: string, value: any) {
    this.startTimer();
    for (let block of this.buffer) {
      if (block.value == null) {
        block.value = value;
        block.resolve = true;
        this.analyzeBuffer();
        this.matrixButtonController(id);
        break;
      }
    };
  }

  analyzeBuffer() {
    let currentValueBuffer = this.buffer[this.positionReadBuffer].value;
    let bufferEmpty = this.buffer.filter((el) => { return el.value === null }).length + 1;
    this.code.forEach((challenge) => {
      if (challenge.resolve != true && challenge.fail != true) {
        let notResolve = challenge.row.filter((el) => { return el.resolve === false }).length;
        if (notResolve <= bufferEmpty) {
          let item = challenge.row[challenge.read];
          if (item.value == currentValueBuffer) {
            item.resolve = true;
            challenge.read++;
            let resolve = challenge.row.filter((el) => {
              return el.resolve == true;
            });
            if (resolve.length == challenge.row.length) {
              challenge.resolve = true;
              this.sesolveRegister++;
            }
          } else {
            let elementRow = document.getElementById(challenge.id);
            elementRow?.insertAdjacentHTML('afterbegin', `<div class="space-code">&nbsp;</div>`);
          }
        } else {
          challenge.fail = true;
          this.failRegister++;
        }
      }
    });
    let elementColHover = document.getElementById('CodeColHover');
    elementColHover?.insertAdjacentHTML('afterbegin', `<div class="space-code">&nbsp;</div>`);
    this.positionReadBuffer++;
    this.checkWins();
  }

  resetGame() {
    this.notRun = true;
    this.timeLeft = '30';
    this.milliseconds = 0;
    this.progresBar = 100;
    this.positionReadBuffer = 0;
    this.bufferSize = 5;
    this.marixReadHistoy = 'col';
    this.sesolveRegister = 0;
    this.failRegister = 0;
    this.splashWinsOrFail = null;
    this.splashWinsOrFailText = 'Uploaded Demons Failed';
    this.buffer = [];
  }

  matrixFullDisable() {
    this.matrix.forEach((row: any) => {
      row.forEach((el: any) => {
        el.disabled = true;
      })
    });
  }

  matrixButtonController(id: string) {
    const coordinate = id.split('-');
    this.matrix[parseInt(coordinate[0])][parseInt(coordinate[1])].select = true;

    if (this.marixReadHistoy == 'row') {
      this.marixReadHistoy = 'col';
      this.matrixFullDisable();
      this.matrix[parseInt(coordinate[0])].forEach((el: any) => {
        el.disabled = false;
      });
    } else if (this.marixReadHistoy == 'col') {
      this.marixReadHistoy = 'row';
      this.matrixFullDisable();
      for (let index = 0; index < this.matrix.length; index++) {
        this.matrix[index][parseInt(coordinate[1])].disabled = false;
      }
    }

  }

  checkWins(forceFail?: boolean, failText?: string) {
    if (forceFail) {
      this.setFailChallenge();
      if (this.sesolveRegister > 0) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'Uploaded demons';
      } else {
        this.splashWinsOrFail = 'fail';
        this.splashWinsOrFailText = failText ? failText : 'Error';
      }
      this.stopTimer();
      return
    }

    if (this.sesolveRegister == this.code.length || this.failRegister == this.code.length || (this.sesolveRegister + this.failRegister) == this.code.length) {
      if (this.sesolveRegister == this.code.length) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'All demons uploaded';
      } else if (this.sesolveRegister > 0) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'Uploaded demons';
      } else if (this.failRegister == this.code.length) {
        this.splashWinsOrFail = 'fail';
        this.splashWinsOrFailText = 'Uploaded Demons Failed';
      }
      this.stopTimer();
      return
    }

    if (this.positionReadBuffer >= this.bufferSize) {
      this.setFailChallenge();
      if (this.sesolveRegister > 0) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'Uploaded demons';
      } else {
        this.splashWinsOrFail = 'fail';
        this.splashWinsOrFailText = 'Complete buffer';
      }
      this.stopTimer();
      return
    }
  }

  setFailChallenge(): void {
    this.code.filter((challenge) => {
      if (challenge.resolve != true) {
        challenge.fail = true;
      }
    });
  }

  tryAgain() {
    this.resetGame();
    this.loaderLevel('auto', this.lastLevel)
  }

  nextLevel() {
    this.difficulty++;
    this.resetGame();
    this.loaderLevel('auto');
  }
}