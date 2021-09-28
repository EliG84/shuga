import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePlaceholderDirective } from './directives/image-placeholder.directive';

const classes = [
  ImagePlaceholderDirective
]


@NgModule({
  declarations: [...classes],
  imports: [
    CommonModule
  ],
  exports: [...classes]
})
export class ShareDirectiveModule { }
