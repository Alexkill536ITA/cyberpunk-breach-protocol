import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-script-animations',
    templateUrl: './script-animations.component.html',
    styleUrls: ['./script-animations.component.scss'],
    standalone: false
})
export class ScriptAnimationsComponent implements OnInit {

  @Input() successOrFail: string | null = null;
  success = '//ROOT\n//ACCESS_REQUEST\n//ACCESS_REQUEST_SUCCESS\n//COLLECTING PACKET_1 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . COMPLETE\n//COLLECTING PACKET_2 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . COMPLETE\n//COLLECTING PACKET_3 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . COMPLETE\n//COLLECTING PACKET_4 . . . . . . . . . . . . . . . . . . . . . . . . . . . . . COMPLETE\n//LOGIN\n//LOGIN_SUCCESS\n//\n//UPLOAD_IN_PROGRESS\n//UPLOAD_COMPLETE!';
  fail = '//TRY_ROOT_1\n//TRY_ROOT_2\n//TRY_ROOT_3\n//ROOT_FALLED\n//ROOT_RESTART\n//ACCESS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . FAIL\n//ACCESS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . FAIL\n//ACCESS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . FAIL\n//ACCESS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . FAIL\n//ACCESS . . . . . . . . . . . . . . . . . . . . . . . . . . . . . FAIL';
  interval: any;

  constructor() { }

  ngOnInit(): void {
    const code = document.getElementById('code-animation-consolle');
    this.animation(code);
  }

  animation(code: any) {
    let index = 0;
    let text = this.successOrFail == 'resolve' ? this.success : this.fail;
    this.interval = setInterval(() => {
      if (index <= text.length) {
        code.textContent += text.charAt(index);
        index++;
      } else {
        clearInterval(this.interval);
      }
    }, 8);
  }
}