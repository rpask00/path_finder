import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[clickPreventDefault]'
})
export class ClickPreventDefaultDirective {
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event?.preventDefault?.();
  }
}
