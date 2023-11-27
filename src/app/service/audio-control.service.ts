import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioControlService {
  private statusSubject = new BehaviorSubject<boolean>(false);
  isMuted$ = this.statusSubject.asObservable();
 
  constructor() {}
 
  changeStatus(status: boolean) {
     this.statusSubject.next(status);
  }

}
