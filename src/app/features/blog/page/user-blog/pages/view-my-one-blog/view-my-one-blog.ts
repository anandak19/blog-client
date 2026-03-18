import { Location } from '@angular/common';
import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IBlogDetails } from '@features/blog/models/blog.interface';
import { BlogService } from '@features/blog/services/blog-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { ShowBlogDetails } from '../../components/show-blog-details/show-blog-details';
import { DialogService } from '@core/service/dialog/dialog-service';

@Component({
  selector: 'app-view-my-one-blog',
  imports: [MatIconModule, MatIconButton, ShowBlogDetails],
  templateUrl: './view-my-one-blog.html',
  styleUrl: './view-my-one-blog.scss',
})
export class ViewMyOneBlog implements OnInit {
  //----injections----
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);
  private _location = inject(Location);
  private _dialogService = inject(DialogService);

  //----properties----
  @Input() id!: string;
  blogDetails = signal<IBlogDetails | null>(null);

  //----methods----
  onBack() {
    this._location.back();
  }

  onDelete() {
    this.checkIdValid();

    this._dialogService.ask().then((yes) => {
      if (yes) {
        this._blogService
          .deleteOneBlog(this.id)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe({
            next: (res) => {
              this._snackbar.success(res.message);
              this.onBack();
            },
            error: (err: IErrorResponse) => {
              this._snackbar.error(err.message);
            },
          });
      }
    });
  }

  onEdit() {
    this.checkIdValid();
    this._router.navigate(['edit'], { relativeTo: this._activatedRoute });
  }

  getBlogDetails() {
    this.checkIdValid();

    this._blogService
      .findBlogDetails(this.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.blogDetails.set(res.data);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }

  checkIdValid() {
    if (!this.id) {
      this._router.navigate(['mine']);
    }
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.getBlogDetails();
  }
}
