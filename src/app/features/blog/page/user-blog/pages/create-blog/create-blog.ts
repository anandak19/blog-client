import { Component, DestroyRef, inject, Input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { BlogEditorComponent } from '../../components/blog-editor-component/blog-editor-component';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { BlogService } from '@features/blog/services/blog-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { IErrorResponse } from 'app/types/api-response.types';

@Component({
  selector: 'app-create-blog',
  imports: [MatIconModule, MatButtonModule, BlogEditorComponent],
  templateUrl: './create-blog.html',
  styleUrl: './create-blog.scss',
})
export class CreateBlog {
  //----injections----
  private _location = inject(Location);
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);
  //----properties----
  isFormSubmitted = signal<boolean>(false);
  isFormLoading = signal<boolean>(false);
  //----methods----

  createNewBlog(formData: FormData) {
    this._blogService
      .createBlog(formData)
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        finalize(() => this.isFormLoading.set(false)),
      )
      .subscribe({
        next: (res) => {
          this._snackbar.success(res.message);
          this._router.navigate(['/mine']);
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
