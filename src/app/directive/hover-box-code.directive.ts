import { Directive, HostListener, Input } from '@angular/core';
import { GameComponent } from "../layout/game/game.component";

@Directive({
  selector: '[hoverBoxCodeDirective]'
})
export class HoverBoxCodeDirective {

  constructor(
    private gameComponent: GameComponent
  ) { }

  @Input('hoverBoxCode') value: string | undefined;

  @HostListener('mouseenter') onMouseEnter() {
    if (this.gameComponent.notRun) {
      this.addHighlight();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.removeHighlight();
  }

  private addHighlight() {
    let elements = document.querySelectorAll('.hoverBoxCode');
    if (elements) {
      elements.forEach((el: any) => {
        if (el.outerText == this.value) {
          let temp = el.getAttribute('class');
          el.setAttribute('class', temp.replace('hoverBoxCode', 'hoverBoxCode-active'));
        }
      });
    }
  }

  private removeHighlight() {
    let elements = document.querySelectorAll('.hoverBoxCode-active');
    if (elements) {
      elements.forEach((el: any) => {
        let temp = el.getAttribute('class');
        el.setAttribute('class', temp.replace('hoverBoxCode-active', 'hoverBoxCode'));
      });
    }
  }

}
