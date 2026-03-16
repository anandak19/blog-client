import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlogEditorComponent } from '../../components/blog-editor-component/blog-editor-component';

@Component({
  selector: 'app-edit-my-one-blog',
  imports: [MatIconModule, MatButtonModule, BlogEditorComponent],
  templateUrl: './edit-my-one-blog.html',
  styleUrl: './edit-my-one-blog.scss',
})
export class EditMyOneBlog {

}
