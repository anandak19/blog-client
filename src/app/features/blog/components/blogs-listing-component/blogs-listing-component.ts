import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { IListBlog } from '@features/blog/models/blog.interface';
import { IPaginationMeta } from 'app/types/api-response.types';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-blogs-listing-component',
  imports: [DatePipe, MatPaginatorModule],
  templateUrl: './blogs-listing-component.html',
  styleUrl: './blogs-listing-component.scss',
})
export class BlogsListingComponent {
  @Input() blogs = signal<IListBlog[]>([]);
  @Input() paginationMeta = signal<IPaginationMeta | null>(null);
  @Output() onPageChange = new EventEmitter<number>();
  @Output() onBlogClick = new EventEmitter<string>();

  handlePage(page: PageEvent) {
    this.onPageChange.emit(page.pageIndex + 1);
  }

  handleOnBlogClick(blogId: string) {
    this.onBlogClick.emit(blogId);
  }
}
