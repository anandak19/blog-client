import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BlogEditorComponent } from "../../components/blog-editor-component/blog-editor-component";

@Component({
  selector: 'app-create-blog',
  imports: [MatIconModule, MatButtonModule, BlogEditorComponent],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog {
  //----injections----
  //----properties----
  //----methods----
  //----lifecycle hooks----
}
