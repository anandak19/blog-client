import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IListBlog } from '@features/blog/models/blog.interface';
import { BlogService } from '@features/blog/services/blog-service';
import { IErrorResponse, IPaginationMeta } from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';
import { BlogsListingComponent } from '@features/blog/components/blogs-listing-component/blogs-listing-component';

@Component({
  selector: 'app-home',
  imports: [BlogsListingComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
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
  getBlogs() {
    this._blogService
      .findAll(this.paginationFilter())
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.paginationMeta.set(res.data.meta);
          this.blogs.set(res.data.documents);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }

  updatePage(page: number) {
    this.paginationFilter.update((curr) => ({ ...curr, page }));
    this.getBlogs();
  }

  handleBlogClick(id: string) {
    this._router.navigate([`blog/${id}`], { relativeTo: this._activatedRoute });
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.getBlogs();
  }
}
