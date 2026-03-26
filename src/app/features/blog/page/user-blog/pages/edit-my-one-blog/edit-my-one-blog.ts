import { Component, DestroyRef, inject, Input, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BlogEditorComponent } from '../../components/blog-editor-component/blog-editor-component';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '@features/blog/services/blog-service';
import { IBlogDetails } from '@features/blog/models/blog.interface';
import { IErrorResponse } from 'app/types/api-response.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Location } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-my-one-blog',
  imports: [MatIconModule, MatButtonModule, BlogEditorComponent],
  templateUrl: './edit-my-one-blog.html',
  styleUrl: './edit-my-one-blog.scss',
})
export class EditMyOneBlog {
  //----injections----
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);
  private _location = inject(Location);

  //----properties----
  @Input() id!: string;

  isFormSubmitted = signal<boolean>(false);
  isFormLoading = signal<boolean>(false);
  //----methods----

  checkIdValid() {
    if (!this.id) {
      this._router.navigate(['/']);
    }
  }

  handleEdit(blogData: FormData) {
    this.checkIdValid();

    this._blogService
      .updateBlog(this.id, blogData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isFormLoading.set(false)),
      )
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

  onBack() {
    this._location.back();
  }

  //----lifecycle hooks----
}
