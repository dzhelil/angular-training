import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() elemColor;

  constructor(private _el: ElementRef) {
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
      this.applyBackGround(true);
  }

  @HostListener('mouseleave')
  onMouseLeave(event) {
    this.applyBackGround(false);
  }

  applyBackGround(apply:boolean) {
    const color = this.elemColor ? this.elemColor : "red";
    if (apply) {
      this._el.nativeElement.style.background = color;
    } else {
      this._el.nativeElement.style = '';
    }
  }
}
