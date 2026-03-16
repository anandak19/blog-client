import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-blog-editor-component',
  imports: [],
  templateUrl: './blog-editor-component.html',
  styleUrl: './blog-editor-component.scss',
})
export class BlogEditorComponent {
  @Input() id!: string;
  @Output() blogFormData = new EventEmitter<FormData>()
}
