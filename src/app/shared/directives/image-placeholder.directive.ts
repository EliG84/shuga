import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appImagePlaceholder]'
})
export class ImagePlaceholderDirective {

  @Input()
  imagePlaceholder = 'assets/images/food_default.png'

  constructor(private elementRef: ElementRef) {
    elementRef.nativeElement.onerror = () =>
              elementRef.nativeElement.src = this.imagePlaceholder;
  }

}
