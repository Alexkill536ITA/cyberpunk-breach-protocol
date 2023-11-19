import { Injectable } from '@angular/core';
import { Decorator, TypeDecorator, Challenge, Matrix, Level } from '../models/comon.model';
import { Livello_1, Livello_10, Livello_11, Livello_12, Livello_13, Livello_14, Livello_2, Livello_3, Livello_4, Livello_5, Livello_6, Livello_7, Livello_8, Livello_9 } from '../models/levels.model';

@Injectable({
  providedIn: 'root'
})
export class MatrixLevelGeneratorService {

  getRandomValue(): string {
    switch (Math.floor(Math.random() * 6)) {
      case 0:
        return '55';
      case 1:
        return '1C';
      case 2:
        return '7A';
      case 3:
        return 'BD';
      case 4:
        return 'E9';
      case 5:
        return 'FF';
      default:
        return this.getRandomValue();
    }
  }

  matrixGen(size: number): Array<Matrix[]> {
    let matrix: Array<Matrix[]>  = [];
    for (let y = 0; y < size; y++) {
      let row: Matrix[] = [];
      for (let x = 0; x < size; x++) {
        if (y == 0) {
          row.push({ value: this.getRandomValue(), select: false, disabled: false });
        } else {
          row.push({ value: this.getRandomValue(), select: false, disabled: true });
        }
      }
      matrix.push(row);
    }
    return matrix;
  }

  codeGen(size: number): any[] {
    let code = [];

    if (size >= 2 && size <= 4) {
      for (let i = 0; i < size; i++) {
        code.push({ value: this.getRandomValue(), resolve: false });
      }
      return code;
    }
    return this.codeGen(4);
  }

  builderDecorator(typeDecoratorSlect: TypeDecorator | string): Decorator {
    switch (typeDecoratorSlect) {
      case TypeDecorator.DATAMINE_V1:
        return {
          logo: "assets/img/Code-Tier-1.png",
          logoResolve: "assets/img/Code-Tier-1-resolve.png",
          logofail: "assets/img/Code-Tier-1-fail.png",
          title: " DATAMINE",
          description: "Dowonload base data"
        }
      case TypeDecorator.DATAMINE_V2:
        return {
          logo: "assets/img/Code-Tier-2.png",
          logoResolve: "assets/img/Code-Tier-2-resolve.png",
          logofail: "assets/img/Code-Tier-2-fail.png",
          title: "ADVANCED DATAMINE",
          description: "Dowonload advance data"
        }
      case TypeDecorator.DATAMINE_V3:
        return {
          logo: "assets/img/Code-Tier-3.png",
          logoResolve: "assets/img/Code-Tier-3-resolve.png",
          logofail: "assets/img/Code-Tier-3-fail.png",
          title: "EXPERT DATAMINE",
          description: "Dowonload expert data"
        }
      case TypeDecorator.ICEPICK_HEAD:
        return {
          logo: "assets/img/Icepick-Head.png",
          logoResolve: "assets/img/Icepick-Head-resolve.png",
          logofail: "assets/img/Icepick-Head-fail.png",
          title: "ICEPICK",
          description: "Bypass cyberware ICE"
        }
      case TypeDecorator.ICEPICK_PC:
        return {
          logo: "assets/img/Icepick-Pc.png",
          logoResolve: "assets/img/Icepick-Pc-resolve.png",
          logofail: "assets/img/Icepick-Pc-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE install malware"
        }
      case TypeDecorator.ICEPICK_HAND:
        return {
          logo: "assets/img/Icepick-Hand.png",
          logoResolve: "assets/img/Icepick-Hand-resolve.png",
          logofail: "assets/img/Icepick-Hand-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE"
        }
      case TypeDecorator.CAMERE_CONTROL:
        return {
          logo: "assets/img/Camera-Control.png",
          logoResolve: "assets/img/Camera-Control-resolve.png",
          logofail: "assets/img/Camera-Control-fail.png",
          title: "CONTROL CAMERA",
          description: "Get controls camera"
        }
      case TypeDecorator.CAMERE_OFF:
        return {
          logo: "assets/img/Camera-OFF.png",
          logoResolve: "assets/img/Camera-OFF-resolve.png",
          logofail: "assets/img/Camera-OFF-fail.png",
          title: "CAMERA SHUTDOWN",
          description: "Deactivate cameras"
        }
      case TypeDecorator.MASS_VULNERABILITY:
        return {
          logo: "assets/img/Mass-Vulnerability.png",
          logoResolve: "assets/img/Mass-Vulnerability-resolve.png",
          logofail: "assets/img/Mass-Vulnerability-fail.png",
          title: "MASS VULNERABILITY",
          description: "Reduces the Resistances of enemies"
        }
      case TypeDecorator.MASS_COLLAPSE:
        return {
          logo: "assets/img/Mass-Collapse.png",
          logoResolve: "assets/img/Mass-Collapse-resolve.png",
          logofail: "assets/img/Mass-Collapse-fail.png",
          title: "MASS COLLAPSE",
          description: "Collapse system of enemies"
        }
      case TypeDecorator.MALWARE:
        return {
          logo: "assets/img/Malware.png",
          logoResolve: "assets/img/Malware-resolve.png",
          logofail: "assets/img/Malware-fail.png",
          title: "MALWARE",
          description: "Install Malware"
        }
      case TypeDecorator.MAINIG_v1:
        return {
          logo: "assets/img/Mainig-1.png",
          logoResolve: "assets/img/Mainig-1-resolve.png",
          logofail: "assets/img/Mainig-1-fail.png",
          title: "MAINIG V1",
          description: "Mainig data of prgrams"
        }
      case TypeDecorator.MAINIG_v2:
        return {
          logo: "assets/img/Mainig-2.png",
          logoResolve: "assets/img/Mainig-2-resolve.png",
          logofail: "assets/img/Mainig-2-fail.png",
          title: "MAINIG V2",
          description: "Mainig data of prgrams"
        }
      case TypeDecorator.CODING:
        return {
          logo: "assets/img/Coding.png",
          logoResolve: "assets/img/Coding-resolve.png",
          logofail: "assets/img/Coding-fail.png",
          title: "PROGRAMMING",
          description: "Coding Software"
        }
      case TypeDecorator.TURRET_SHORT_CIRCUIT:
        return {
          logo: "assets/img/Turret_Short_Circuit.png",
          logoResolve: "assets/img/Turret_Short_Circuit-resolve.png",
          logofail: "assets/img/Turret_Short_Circuit-fail.png",
          title: "TURRET SHORT CIRCUIT",
          description: "Disable Turret and Damage to area"
        }
      case TypeDecorator.TURRET_OFF:
        return {
          logo: "assets/img/Turret_OFF.png",
          logoResolve: "assets/img/Turret_OFF-resolve.png",
          logofail: "assets/img/Turret_OFF-fail.png",
          title: "SHUTDOWN TURRET",
          description: "Disable Turret"
        }
      case TypeDecorator.TURRET_CONTROL:
        return {
          logo: "assets/img/Turret_Control.png",
          logoResolve: "assets/img/Turret_Control-resolve.png",
          logofail: "assets/img/Turret_Control-fail.png",
          title: "CONTROLS TURRET",
          description: "Get controls Turret"
        }
      case TypeDecorator.REBOOT_OPTICAL:
        return {
          logo: "assets/img/Reboot-Optical.png",
          logoResolve: "assets/img/Reboot-Optical-resolve.png",
          logofail: "assets/img/Reboot-Optical-fail.png",
          title: "REBOOT OPTICAL",
          description: "Restart optics of blinded enemies"
        }
      case TypeDecorator.JAMMING:
        return {
          logo: "assets/img/Jamming.png",
          logoResolve: "assets/img/Jamming-resolve.png",
          logofail: "assets/img/Jamming-fail.png",
          title: "JAMMING",
          description: "Jamming smart wepon"
        }
      default:
        return {
          logo: "assets/img/Icepick-Pc.png",
          logoResolve: "assets/img/Icepick-Pc-resolve.png",
          logofail: "assets/img/Icepick-Pc-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE install malware"
        }
    }
  }

  builderChallenge(id: number, sizeCode: number, typeDecoratorSlect: TypeDecorator, customDecorator?: Decorator): Challenge {
    let challenge: Challenge = {
      id: 'challenge-' + id,
      row: this.codeGen(sizeCode),
      read: 0,
      resolve: false,
      fail: false,
      decorator: typeDecoratorSlect != TypeDecorator.CUSTOM ? this.builderDecorator(typeDecoratorSlect) : <Decorator>customDecorator
    }
    return challenge
  }

  builderLevel(timeLeft: string, bufferSize: number, matrixSize: number, code: Challenge[]): Level {
    return {
      id: 'autoGen',
      name: 'autoGen',
      timeLeft: timeLeft,
      bufferSize: bufferSize,
      matrix: this.matrixGen(matrixSize),
      code: code
    }
  }

  autoLevel(difficulty: number): Level {
    switch (difficulty) {
      case 0:
        return this.builderLevel('30', 4, Livello_1.matrixSize, this.challenges(Livello_1.challenge.length, Livello_1.challenge))
      case 1:
        return this.builderLevel('30', 4, Livello_2.matrixSize, this.challenges(Livello_2.challenge.length, Livello_2.challenge))
      case 2:
        return this.builderLevel('30', 4, Livello_3.matrixSize, this.challenges(Livello_3.challenge.length, Livello_3.challenge))
      case 3:
        return this.builderLevel('30', 6, Livello_4.matrixSize, this.challenges(Livello_4.challenge.length, Livello_4.challenge))
      case 4:
        return this.builderLevel('30', 6, Livello_5.matrixSize, this.challenges(Livello_5.challenge.length, Livello_5.challenge))
      case 5:
        return this.builderLevel('30', 6, Livello_6.matrixSize, this.challenges(Livello_6.challenge.length, Livello_6.challenge))
      case 6:
        return this.builderLevel('30', 7, Livello_7.matrixSize, this.challenges(Livello_7.challenge.length, Livello_7.challenge))
      case 7:
        return this.builderLevel('30', 7, Livello_8.matrixSize, this.challenges(Livello_8.challenge.length, Livello_8.challenge))
      case 8:
        return this.builderLevel('30', 7, Livello_9.matrixSize, this.challenges(Livello_9.challenge.length, Livello_9.challenge))
      case 9:
        return this.builderLevel('30', 7, Livello_10.matrixSize, this.challenges(Livello_10.challenge.length, Livello_10.challenge))
      case 10:
        return this.builderLevel('30', 6, Livello_11.matrixSize, this.challenges(Livello_11.challenge.length, Livello_11.challenge))
      case 11:
        return this.builderLevel('30', 6, Livello_12.matrixSize, this.challenges(Livello_12.challenge.length, Livello_12.challenge))
      case 12:
        return this.builderLevel('30', 6, Livello_13.matrixSize, this.challenges(Livello_13.challenge.length, Livello_13.challenge))
      case 13:
        return this.builderLevel('30', 6, Livello_14.matrixSize, this.challenges(Livello_14.challenge.length, Livello_14.challenge))
      default:
        return this.builderLevel(String((Math.random() * (30 - 10 + 1) + 10).toFixed(2)), Math.floor(Math.random() * (8 - 4 + 1)) + 4, 6, this.challenges(Livello_14.challenge.length, Livello_14.challenge))
    }
  }

  challenges(number: number, sizeCode: number[]): Challenge[] {
    let typeDecorator = null;
    let challenges = []
    for (let index = 0; index < number; index++) {
      switch (index) {
        case 0:
          typeDecorator = TypeDecorator.DATAMINE_V1;
          break;
        case 1:
          typeDecorator = TypeDecorator.DATAMINE_V2;
          break;
        case 2:
          typeDecorator = TypeDecorator.DATAMINE_V3;
          break;
        default:
          typeDecorator = TypeDecorator.CODING;
          break;
      }
      challenges.push(this.builderChallenge(index, sizeCode[index], typeDecorator));
    }
    return challenges;
  }


}
