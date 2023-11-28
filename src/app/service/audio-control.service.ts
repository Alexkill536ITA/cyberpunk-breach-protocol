import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MusicList } from '../models/comon.model';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  private MusicSubject = new BehaviorSubject<string>(MusicList.MAIN_THEME);
  music$ = this.MusicSubject.asObservable();

  private statusSubject = new BehaviorSubject<boolean>(false);
  isMuted$ = this.statusSubject.asObservable();

  private volumeSubject = new BehaviorSubject<number>(0.15);
  volume$ = this.volumeSubject.asObservable();

  constructor() { }

  changeMusic(music: string) {
    this.MusicSubject.next(music);
  }

  changeStatus(status: boolean) {
    this.statusSubject.next(status);
  }

  changeVolume(Volume: number) {
    this.volumeSubject.next(Volume);
  }

}
