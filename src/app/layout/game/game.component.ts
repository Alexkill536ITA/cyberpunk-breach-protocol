import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Challenge, Level, Matrix, MusicList } from 'src/app/models/comon.model';
import { AudioControlService } from 'src/app/service/audio-control.service';
import { LevelGeneratorService } from 'src/app/service/level-generator.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss'],
    standalone: false
})
export class GameComponent implements OnInit, AfterViewInit {

  @ViewChild('audioFX') audioFX?: ElementRef;
  audioPathFX: string = './assets/audio/Init_breach_protocol_FX.mp3';
  volume$ = this.audioControlService.volume$;
  volume: number = 0.5;

  public notRun = true;
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
    private router: Router,
    protected audioControlService: AudioControlService
  ) {
    const input = this.router.getCurrentNavigation()?.extras.state;
    if (input) {
      this.id = input['id'];
      this.level = input['level'];
    } else {
      this.id = 'auto';
    }
    this.volume$.subscribe((volume) => {
      this.volume = volume;
    });
  }

  ngOnInit(): void {
    this.loaderLevel(this.id);
  }

  ngAfterViewInit(): void {
    if (this.audioFX) {
      this.audioFX.nativeElement.play();
      this.audioFX.nativeElement.volume = this.volume;
    }
    this.audioControlService.changeMusic(MusicList.GAME_MUSIC);
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

    setTimeout(() => {
      const elementLine = document.getElementById('hover-y-0');
      elementLine?.setAttribute('class', 'hover-line active');
    }, 100);
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
      // Check Challenge already has an outcome
      if (challenge.resolve != true && challenge.fail != true) {
        let notResolve = challenge.row.filter((el) => { return el.resolve === false }).length;
        // Check challenge code can stay in the buffer
        if (notResolve <= bufferEmpty) {
          let item = challenge.row[challenge.read];
          // Check value select include to challenge item
          if (item.value == currentValueBuffer) {
            // Success mech
            item.resolve = true;
            challenge.read++;
            let resolve = challenge.row.filter((el) => {
              return el.resolve == true;
            });
            // Pariti check solve code
            if (resolve.length == challenge.row.length) {
              challenge.resolve = true;
              this.sesolveRegister++;
            }
          } else {
            // Faill mach
            let elementRow = document.getElementById(challenge.id);
            // Last mach is valid
            if (challenge.row[challenge.read - 1] && challenge.row[challenge.read - 1].value == currentValueBuffer) {
              elementRow?.insertAdjacentHTML('afterbegin', `<div class="space-code">&nbsp;</div>`);
            } else {
              // Control add space fail code
              if (challenge.read > 0) {
                for (let index = 0; index <= challenge.read; index++) {
                  elementRow?.insertAdjacentHTML('afterbegin', `<div class="space-code">&nbsp;</div>`);
                }
              } else {
                elementRow?.insertAdjacentHTML('afterbegin', `<div class="space-code">&nbsp;</div>`);
              }
              challenge.read = 0;
              challenge.row.forEach((item) => { item.resolve = false });
            }
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
    this.matrix[parseInt(coordinate[0])][parseInt(coordinate[1])].disabled = true;
    let elementLine = document.getElementById('hover-y-' + coordinate[0]);
    let elementCol = document.getElementById('hover-x-' + coordinate[1]);

    if (this.marixReadHistoy == 'row') {
      this.marixReadHistoy = 'col';
      this.matrixFullDisable();
      this.matrix[parseInt(coordinate[0])].forEach((el: any) => {
        el.disabled = false;
      });
      elementLine?.setAttribute('class', 'hover-line active');
      elementCol?.setAttribute('class', 'hover-col');
    } else if (this.marixReadHistoy == 'col') {
      this.marixReadHistoy = 'row';
      this.matrixFullDisable();
      for (let index = 0; index < this.matrix.length; index++) {
        this.matrix[index][parseInt(coordinate[1])].disabled = false;
      }
      elementLine?.setAttribute('class', 'hover-line');
      elementCol?.setAttribute('class', 'hover-col active');
    }
  }

  updateHoverShow(y: number, x: number) {
    if (this.marixReadHistoy == 'col') {
      let elementCol = document.getElementById('hover-x-' + x);
      elementCol?.setAttribute('class', 'hover-col hover');
    } else {
      let elementLine = document.getElementById('hover-y-' + y);
      elementLine?.setAttribute('class', 'hover-line hover');
    }
  }

  resetHoverShow(y: number, x: number) {
    if (this.marixReadHistoy == 'col') {
      let elementCol = document.getElementById('hover-x-' + x);
      elementCol?.setAttribute('class', 'hover-col');
    } else {
      let elementLine = document.getElementById('hover-y-' + y);
      elementLine?.setAttribute('class', 'hover-line');
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

  setMusic() {
    this.audioControlService.changeMusic(MusicList.MAIN_THEME);
  }
}