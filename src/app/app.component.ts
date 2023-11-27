import { Component, ElementRef, ViewChild } from '@angular/core';
import { AudioControlService } from './service/audio-control.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cyberpunk-hexcode-breach';

  @ViewChild('audio') audio?: ElementRef;
  audioPath = "./assets/audio/01 - Marcin Przybylowicz - V.mp3";
  mute: boolean = false;
  isMuted$ = this.audioMuteService.isMuted$;


  constructor(
    protected audioMuteService: AudioControlService
  ) {
    this.isMuted$.subscribe((isMuted) => {
      this.mute = isMuted;
    });
  }

  ngAfterViewInit(): void {
    if (this.audio) {
      this.audio.nativeElement.play();
      this.audio.nativeElement.volume = 0.15;
    }
  }

  muteControl() {
    this.mute = !this.mute;
    this.audioMuteService.changeStatus(this.mute);
    if (this.audio && this.mute) {
      this.audio.nativeElement.volume = 0;
    } else {
      if (this.audio) this.audio.nativeElement.volume = 0.15;
    }
  }
}
