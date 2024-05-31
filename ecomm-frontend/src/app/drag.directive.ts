import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @HostBinding('class.fileover') fileOver?: boolean;
  @Output() fileDropped = new EventEmitter<FileHandle>();

  constructor(private sanitizer: DomSanitizer){}

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  // Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    let file = evt.dataTransfer?.files[0];
    if (file) {
      let url = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      this.fileDropped.emit({file,url});
    }
  }
}
