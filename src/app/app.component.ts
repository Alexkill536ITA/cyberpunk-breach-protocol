import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { AudioControlService } from './service/audio-control.service';
import { MusicList } from './models/comon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cyberpunk-hexcode-breach';

  @ViewChild('audio') audio?: ElementRef;
  audioPath: string = MusicList.MAIN_THEME;
  music$ = this.audioMuteService.music$;

  mute: boolean = false;
  isMuted$ = this.audioMuteService.isMuted$;

  volume: number = 0.15;
  volume$ = this.audioMuteService.volume$;
  privusVolume: number = 0.15;


  constructor(
    protected audioMuteService: AudioControlService
  ) {
    this.isMuted$.subscribe((isMuted) => {
      this.mute = isMuted;
    });
    this.volume$.subscribe((volume) => {
      this.volume = volume;
    });
  }

  ngAfterViewInit(): void {
    this.music$.subscribe((music) => {
      this.audioPath = music;
      if (this.audio) {
        this.audio.nativeElement.src = this.audioPath;
        this.audio.nativeElement.play();
        this.audio.nativeElement.volume = this.volume;
      }
    });
  }

  volumeControl(event: any) {
    if (event.srcElement.value) {
      this.mute = false;
      this.audioMuteService.changeStatus(this.mute);
      this.volume = parseFloat(event.srcElement.value);
      this.privusVolume = parseFloat(event.srcElement.value);
      this.audioMuteService.changeVolume(this.volume);
    } else if (event.type == 'click') {
      this.mute = !this.mute;
      this.audioMuteService.changeStatus(this.mute);
      this.volume = this.privusVolume;
    }
    if (this.audio) {
      this.audio.nativeElement.muted = this.mute;
      this.audio.nativeElement.volume = this.volume;
    }
  }
}
