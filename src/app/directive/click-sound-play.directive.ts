import { Directive, HostListener } from '@angular/core';
import { AudioControlService } from "../service/audio-control.service";

@Directive({
  selector: '[clickSoundPlayDirective]'
})
export class ClickSoundPlayDirective {
  audio = new Audio();
  mute: boolean = false;
  isMuted$ = this.audioMuteService.isMuted$;


  constructor(
    protected audioMuteService: AudioControlService
  ) {
    this.isMuted$.subscribe((isMuted) => {
      this.mute = isMuted;
    });
    this.audio.src = "./assets/audio/Active_FX_Button.mp3";
    this.audio.load();
  }

  @HostListener('click') onMouseEnter() {
    if (!this.mute) {
      this.audio.play();
    }
  }
}
