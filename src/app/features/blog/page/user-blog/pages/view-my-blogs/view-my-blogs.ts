import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { BlogsListingComponent } from '@features/blog/components/blogs-listing-component/blogs-listing-component';
import { IListBlog } from '@features/blog/models/blog.interface';
import { BlogService } from '@features/blog/services/blog-service';
import { IErrorResponse, IPaginationMeta } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';

@Component({
  selector: 'app-view-my-blogs',
  imports: [BlogsListingComponent],
  templateUrl: './view-my-blogs.html',
  styleUrl: './view-my-blogs.scss',
})
export class ViewMyBlogs implements OnInit {
  //----injections----
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);

  //----properties----
  paginationFilter = signal<IPaginationQuery>({ page: 1 });
  paginationMeta = signal<IPaginationMeta | null>(null);
  blogs = signal<IListBlog[]>([]);

  //----methods----
  updatePage(page: number) {
    this.paginationFilter.update((curr) => ({ ...curr, page }));
    this.getMyBlogs();
  }

  getMyBlogs() {
    this._blogService
      .findAllUsersBlogs(this.paginationFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.blogs.set(res.data.documents);
          this.paginationMeta.set(res.data.meta);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }

  handleBlogClick(blogId: string) {
    this._router.navigate([`${blogId}`], { relativeTo: this._activatedRoute });
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.getMyBlogs()
  }
}
