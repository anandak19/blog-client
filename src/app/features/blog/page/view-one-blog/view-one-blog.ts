import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, ActivatedRoute } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IBlogDetails } from '@features/blog/models/blog.interface';
import { BlogService } from '@features/blog/services/blog-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatIconButton } from '@angular/material/button';
import { Location } from '@angular/common';
import { ShowBlogDetails } from "../user-blog/components/show-blog-details/show-blog-details";

@Component({
  selector: 'app-view-one-blog',
  imports: [MatIconModule, MatIconButton, ShowBlogDetails],
  templateUrl: './view-one-blog.html',
  styleUrl: './view-one-blog.scss',
})
export class ViewOneBlog implements OnInit {
  //----injections----
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);
  private _location = inject(Location);

  //----properties----
  @Input() id!: string;
  blogDetails = signal<IBlogDetails | null>(null);

  //----methods----
  getBlogDetails() {
    if (!this.id) {
      this._router.navigate(['/']);
    }

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

  onBack() {
    this._location.back();
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.getBlogDetails();
  }
}
