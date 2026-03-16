import { Component, DestroyRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';

@Component({
  selector: 'app-blog-editor-component',
  imports: [],
  templateUrl: './blog-editor-component.html',
  styleUrl: './blog-editor-component.scss',
})
export class BlogEditorComponent {
  //----injections----
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);

  //----properties----
  @Output() blogFormData = new EventEmitter<FormData>();
  @Input() id!: string;
  blogForm!: FormGroup;

  //----methods----
  initBlogForm() {
    this.blogForm = this._fb.group({
      title: [''],
      conent: [''],
      image: [null],
    });
  }

  //----lifecycle hooks----
}
