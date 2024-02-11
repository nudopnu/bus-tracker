import { Directive, ElementRef, EventEmitter, Host, HostListener, Output, ViewContainerRef, ViewRef } from '@angular/core';

@Directive({
  selector: '[vrtSubmit]'
})
export class SubmitDirective {

  @Output()
  onSubmit = new EventEmitter();

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSubmit.emit();
    }
  }
}
