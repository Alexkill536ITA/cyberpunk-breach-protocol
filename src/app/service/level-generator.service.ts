import { Injectable } from '@angular/core';
import { Decorator, TypeDecorator, Challenge, Level } from '../models/comon.model';
import { Livello_1, Livello_10, Livello_11, Livello_12, Livello_13, Livello_14, Livello_2, Livello_3, Livello_4, Livello_5, Livello_6, Livello_7, Livello_8, Livello_9 } from '../models/levels.model';
import { MatrixGeneratorService } from './matrix-generator.service';

@Injectable({
  providedIn: 'root'
})
export class LevelGeneratorService {

  constructor(
    private matrixGeneratorService: MatrixGeneratorService
  ) { }

  builderDecorator(typeDecoratorSlect: TypeDecorator | string): Decorator {
    switch (typeDecoratorSlect) {
      case TypeDecorator.DATAMINE_V1:
        return {
          logo: "./assets/img/Code-Tier-1.png",
          logoResolve: "./assets/img/Code-Tier-1-resolve.png",
          logofail: "./assets/img/Code-Tier-1-fail.png",
          title: " DATAMINE",
          description: "Dowonload base data"
        }
      case TypeDecorator.DATAMINE_V2:
        return {
          logo: "./assets/img/Code-Tier-2.png",
          logoResolve: "./assets/img/Code-Tier-2-resolve.png",
          logofail: "./assets/img/Code-Tier-2-fail.png",
          title: "ADVANCED DATAMINE",
          description: "Dowonload advance data"
        }
      case TypeDecorator.DATAMINE_V3:
        return {
          logo: "./assets/img/Code-Tier-3.png",
          logoResolve: "./assets/img/Code-Tier-3-resolve.png",
          logofail: "./assets/img/Code-Tier-3-fail.png",
          title: "EXPERT DATAMINE",
          description: "Dowonload expert data"
        }
      case TypeDecorator.ICEPICK_HEAD:
        return {
          logo: "./assets/img/Icepick-Head.png",
          logoResolve: "./assets/img/Icepick-Head-resolve.png",
          logofail: "./assets/img/Icepick-Head-fail.png",
          title: "ICEPICK",
          description: "Bypass cyberware ICE"
        }
      case TypeDecorator.ICEPICK_PC:
        return {
          logo: "./assets/img/Icepick-Pc.png",
          logoResolve: "./assets/img/Icepick-Pc-resolve.png",
          logofail: "./assets/img/Icepick-Pc-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE install malware"
        }
      case TypeDecorator.ICEPICK_HAND:
        return {
          logo: "./assets/img/Icepick-Hand.png",
          logoResolve: "./assets/img/Icepick-Hand-resolve.png",
          logofail: "./assets/img/Icepick-Hand-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE"
        }
      case TypeDecorator.CAMERE_CONTROL:
        return {
          logo: "./assets/img/Camera-Control.png",
          logoResolve: "./assets/img/Camera-Control-resolve.png",
          logofail: "./assets/img/Camera-Control-fail.png",
          title: "CONTROL CAMERA",
          description: "Get controls camera"
        }
      case TypeDecorator.CAMERE_OFF:
        return {
          logo: "./assets/img/Camera-OFF.png",
          logoResolve: "./assets/img/Camera-OFF-resolve.png",
          logofail: "./assets/img/Camera-OFF-fail.png",
          title: "CAMERA SHUTDOWN",
          description: "Deactivate cameras"
        }
      case TypeDecorator.MASS_VULNERABILITY:
        return {
          logo: "./assets/img/Mass-Vulnerability.png",
          logoResolve: "assets/img/Mass-Vulnerability-resolve.png",
          logofail: "./assets/img/Mass-Vulnerability-fail.png",
          title: "MASS VULNERABILITY",
          description: "Reduces the Resistances of enemies"
        }
      case TypeDecorator.MASS_COLLAPSE:
        return {
          logo: "./assets/img/Mass-Collapse.png",
          logoResolve: "./assets/img/Mass-Collapse-resolve.png",
          logofail: "./assets/img/Mass-Collapse-fail.png",
          title: "MASS COLLAPSE",
          description: "Collapse system of enemies"
        }
      case TypeDecorator.MALWARE:
        return {
          logo: "./assets/img/Malware.png",
          logoResolve: "./assets/img/Malware-resolve.png",
          logofail: "./assets/img/Malware-fail.png",
          title: "MALWARE",
          description: "Install Malware"
        }
      case TypeDecorator.MAINIG_v1:
        return {
          logo: "./assets/img/Mainig-1.png",
          logoResolve: "./assets/img/Mainig-1-resolve.png",
          logofail: "./assets/img/Mainig-1-fail.png",
          title: "MAINIG V1",
          description: "Mainig data of prgrams"
        }
      case TypeDecorator.MAINIG_v2:
        return {
          logo: "./assets/img/Mainig-2.png",
          logoResolve: "./assets/img/Mainig-2-resolve.png",
          logofail: "./assets/img/Mainig-2-fail.png",
          title: "MAINIG V2",
          description: "Mainig data of prgrams"
        }
      case TypeDecorator.CODING:
        return {
          logo: "./assets/img/Coding.png",
          logoResolve: "./assets/img/Coding-resolve.png",
          logofail: "./assets/img/Coding-fail.png",
          title: "PROGRAMMING",
          description: "Coding Software"
        }
      case TypeDecorator.TURRET_SHORT_CIRCUIT:
        return {
          logo: "./assets/img/Turret_Short_Circuit.png",
          logoResolve: "./assets/img/Turret_Short_Circuit-resolve.png",
          logofail: "./assets/img/Turret_Short_Circuit-fail.png",
          title: "TURRET SHORT CIRCUIT",
          description: "Disable Turret and Damage to area"
        }
      case TypeDecorator.TURRET_OFF:
        return {
          logo: "./assets/img/Turret_OFF.png",
          logoResolve: "./assets/img/Turret_OFF-resolve.png",
          logofail: "./assets/img/Turret_OFF-fail.png",
          title: "SHUTDOWN TURRET",
          description: "Disable Turret"
        }
      case TypeDecorator.TURRET_CONTROL:
        return {
          logo: "./assets/img/Turret_Control.png",
          logoResolve: "./assets/img/Turret_Control-resolve.png",
          logofail: "./assets/img/Turret_Control-fail.png",
          title: "CONTROLS TURRET",
          description: "Get controls Turret"
        }
      case TypeDecorator.REBOOT_OPTICAL:
        return {
          logo: "./assets/img/Reboot-Optical.png",
          logoResolve: "./assets/img/Reboot-Optical-resolve.png",
          logofail: "./assets/img/Reboot-Optical-fail.png",
          title: "REBOOT OPTICAL",
          description: "Restart optics of blinded enemies"
        }
      case TypeDecorator.JAMMING:
        return {
          logo: "./assets/img/Jamming.png",
          logoResolve: "./assets/img/Jamming-resolve.png",
          logofail: "./assets/img/Jamming-fail.png",
          title: "JAMMING",
          description: "Jamming smart wepon"
        }
      default:
        return {
          logo: "./assets/img/Icepick-Pc.png",
          logoResolve: "./assets/img/Icepick-Pc-resolve.png",
          logofail: "./assets/img/Icepick-Pc-fail.png",
          title: "ICEPICK",
          description: "Bypass ICE install malware"
        }
    }
  }

  builderChallenge(id: number, sequence: any[], typeDecoratorSlect: TypeDecorator, customDecorator?: Decorator): Challenge {
    let challenge: Challenge = {
      id: 'challenge-' + id,
      size: sequence.length,
      row: [...sequence],
      read: 0,
      resolve: false,
      fail: false,
      decorator: typeDecoratorSlect != TypeDecorator.CUSTOM ? this.builderDecorator(typeDecoratorSlect) : <Decorator>customDecorator
    }
    return challenge
  }

  builderLevel(timeLeft: string, bufferSize: number, matrixSize: number, sequenceSize: number[]): Level {
    let typeDecorator = null;
    let code: Challenge[] = [];
    let res = this.matrixGeneratorService.generate(bufferSize, matrixSize, sequenceSize);

    for (let index = 0; index < sequenceSize.length; index++) {
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
      code.push(this.builderChallenge(index, res.sequences[index], typeDecorator));
    };

    return {
      id: 'autoGen',
      name: 'autoGen',
      timeLeft: timeLeft,
      bufferSize: bufferSize,
      matrix: res.matrix,
      code: code
    }
  }

  autoLevel(difficulty: number): Level {
    switch (difficulty) {
      case 0:
        return this.builderLevel('30', 4, Livello_1.matrixSize, Livello_1.challenge)
      case 1:
        return this.builderLevel('30', 4, Livello_2.matrixSize, Livello_2.challenge)
      case 2:
        return this.builderLevel('30', 4, Livello_3.matrixSize, Livello_3.challenge)
      case 3:
        return this.builderLevel('30', 6, Livello_4.matrixSize, Livello_4.challenge)
      case 4:
        return this.builderLevel('30', 6, Livello_5.matrixSize, Livello_5.challenge)
      case 5:
        return this.builderLevel('30', 6, Livello_6.matrixSize, Livello_6.challenge)
      case 6:
        return this.builderLevel('30', 7, Livello_7.matrixSize, Livello_7.challenge)
      case 7:
        return this.builderLevel('30', 7, Livello_8.matrixSize, Livello_8.challenge)
      case 8:
        return this.builderLevel('30', 7, Livello_9.matrixSize, Livello_9.challenge)
      case 9:
        return this.builderLevel('30', 7, Livello_10.matrixSize, Livello_10.challenge)
      case 10:
        return this.builderLevel('30', 6, Livello_11.matrixSize, Livello_11.challenge)
      case 11:
        return this.builderLevel('30', 6, Livello_12.matrixSize, Livello_12.challenge)
      case 12:
        return this.builderLevel('30', 6, Livello_13.matrixSize, Livello_13.challenge)
      case 13:
        return this.builderLevel('30', 6, Livello_14.matrixSize, Livello_14.challenge)
      default:
        return this.builderLevel(String((Math.random() * (30 - 10 + 1) + 10).toFixed(2)), Math.floor(Math.random() * (8 - 4 + 1)) + 4, 6, Livello_14.challenge)
    }
  }

}