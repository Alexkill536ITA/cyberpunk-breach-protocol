import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  notRun = true;
  timeLeft: string = '30';
  interval: any;
  milliseconds: number = 0;
  progresBar: number = 100;
  positionReadBuffer: number = 0;
  bufferSize: number = 8;
  marixReadHistoy: string = 'col';
  splashWinsOrFail: string | null = null;
  splashWinsOrFailText: string = 'Uploaded Demons Failed';

  matrix = [
    [{ value: '1c', select: false, disabled: false }, { value: 'bd', select: false, disabled: false }, { value: 'e9', select: false, disabled: false }, { value: '55', select: false, disabled: false }, { value: 'e9', select: false, disabled: false }],
    [{ value: '1c', select: false, disabled: true }, { value: '1c', select: false, disabled: true }, { value: '1c', select: false, disabled: true }, { value: 'e9', select: false, disabled: true }, { value: '1c', select: false, disabled: true }],
    [{ value: '55', select: false, disabled: true }, { value: '55', select: false, disabled: true }, { value: '55', select: false, disabled: true }, { value: 'e9', select: false, disabled: true }, { value: '55', select: false, disabled: true }],
    [{ value: '55', select: false, disabled: true }, { value: '55', select: false, disabled: true }, { value: '1c', select: false, disabled: true }, { value: 'bd', select: false, disabled: true }, { value: '55', select: false, disabled: true }],
    [{ value: '1c', select: false, disabled: true }, { value: '55', select: false, disabled: true }, { value: '1c', select: false, disabled: true }, { value: '55', select: false, disabled: true }, { value: '1c', select: false, disabled: true }],
  ]

  code = [
    {
      id: 'challenge-1',
      row: [
        { value: 'e9', resolve: false },
        { value: '1c', resolve: false },
        { value: '1c', resolve: false }
      ],
      read: 0,
      resolve: false,
      fail: false,
      decorator: {
        logo: "assets/img/Code-Tier-1.png",
        logoResolve: "assets/img/Code-Tier-1-resolve.png",
        logofail: "assets/img/Code-Tier-1-fail.png",
        title: "DATAMINE_V1",
        description: "555555555555555555555555"
      }
    },
    {
      id: 'challenge-2',
      row: [
        { value: '1c', resolve: false },
        { value: '1c', resolve: false },
        { value: '1c', resolve: false }
      ],
      read: 0,
      resolve: false,
      fail: false,
      decorator: {
        logo: "assets/img/Code-Tier-2.png",
        logoResolve: "assets/img/Code-Tier-2-resolve.png",
        logofail: "assets/img/Code-Tier-2-fail.png",
        title: "DATAMINE_V2",
        description: "555555555555555555555555"
      }
    },
    {
      id: 'challenge-3',
      row: [
        { value: '1c', resolve: false },
        { value: 'bd', resolve: false },
        { value: 'e9', resolve: false }
      ],
      read: 0,
      resolve: false,
      fail: null,
      decorator: {
        logo: "assets/img/Code-Tier-3.png",
        logoResolve: "assets/img/Code-Tier-3-resolve.png",
        logofail: "assets/img/Code-Tier-3-fail.png",
        title: "DATAMINE_V3",
        description: "555555555555555555555555"
      }
    },
  ]

  buffer: any[] = [];

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {
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
          this.stopTimer();
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
            }
          } else {
            let elementRow = document.getElementById(challenge.id);
            elementRow?.insertAdjacentHTML('afterbegin', `<div style="width: 40px;">&nbsp;</div>`);
          }
        } else {
          challenge.fail = true;
        }
      }
    });
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
  }

  matrixFullDisable() {
    this.matrix.forEach((row) => {
      row.forEach((el) => {
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
      this.matrix[parseInt(coordinate[0])].forEach((el) => {
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
    let sesolveRegister = 0;
    let failRegister = 0;
    this.code.forEach((challenge) => {
      if (challenge.resolve) sesolveRegister++;
      if (challenge.fail) failRegister++;
    });

    if (forceFail) {
      this.setFailChallenge();
      this.splashWinsOrFail = 'fail';
      this.splashWinsOrFailText = failText ? failText : 'Error';
      this.stopTimer();
      return
    }

    if (sesolveRegister == this.code.length || failRegister == this.code.length || (sesolveRegister + failRegister) == this.code.length) {
      if (sesolveRegister == this.code.length) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'All demons uploaded';
      } else if (sesolveRegister > 0) {
        this.splashWinsOrFail = 'resolve';
        this.splashWinsOrFailText = 'Uploaded demons';
      } else if (failRegister == this.code.length) {
        this.splashWinsOrFail = 'fail';
        this.splashWinsOrFailText = 'Uploaded Demons Failed';
      }
      this.stopTimer();
      return
    }

    if (this.positionReadBuffer >= this.bufferSize) {
      this.setFailChallenge();
      this.splashWinsOrFail = 'fail';
      this.splashWinsOrFailText = 'Complete buffer';
      this.stopTimer();
      return
    }
  }

  setFailChallenge() {
    this.code.filter((challenge) => {
      if (challenge.resolve != true) {
        challenge.fail = true;
      }
    });
  }
}