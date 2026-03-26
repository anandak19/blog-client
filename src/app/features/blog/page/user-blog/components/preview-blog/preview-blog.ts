import { Component, Input } from '@angular/core';
import { IBlogForm } from '../blog-editor-component/blog-editor-component';

@Component({
  selector: 'app-preview-blog',
  imports: [],
  templateUrl: './preview-blog.html',
  styleUrl: './preview-blog.scss',
})
export class PreviewBlog {
  @Input() imageUrl!: string | ArrayBuffer | null; 
  @Input() blogFormValues!: IBlogForm
}
