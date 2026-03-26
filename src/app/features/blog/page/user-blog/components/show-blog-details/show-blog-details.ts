import { DatePipe } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { IBlogDetails } from '@features/blog/models/blog.interface';

@Component({
  selector: 'app-show-blog-details',
  imports: [DatePipe],
  templateUrl: './show-blog-details.html',
  styleUrl: './show-blog-details.scss',
})
export class ShowBlogDetails {
  @Input() blogDetails = signal<IBlogDetails | null>(null);
}
