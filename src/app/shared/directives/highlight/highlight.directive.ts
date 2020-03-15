import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) {
    console.log('foo');
    this.element.nativeElement.style.backgroundColor = 'orange';
  }

}
