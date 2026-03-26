import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatLabel, MatError } from '@angular/material/select';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { PreviewBlog } from '../preview-blog/preview-blog';
import { BlogService } from '@features/blog/services/blog-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';
import { IErrorResponse } from 'app/types/api-response.types';
import { IBlogDetails } from '@features/blog/models/blog.interface';

export interface IBlogForm {
  title: string;
  content: string;
}

@Component({
  selector: 'app-blog-editor-component',
  imports: [
    NgxEditorModule,
    FormsModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    ReactiveFormsModule,
    LoadingButton,
    CommonModule,
    PreviewBlog,
  ],
  templateUrl: './blog-editor-component.html',
  styleUrl: './blog-editor-component.scss',
})
export class BlogEditorComponent implements OnInit, OnDestroy {
  //----injections----
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _blogService = inject(BlogService);

  //----properties----
  @Input() id!: string;
  @Input() isEditMode: boolean = false;
  @Input() isFormSubmitted = signal<boolean>(false);
  @Input() isFormLoading = signal<boolean>(false);

  @Output() blogFormData = new EventEmitter<FormData>();
  blogForm!: FormGroup<{
    title: FormControl<string>;
    content: FormControl<string>;
  }>;

  editor!: Editor;
  isEditorView = signal<boolean>(true);

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['ordered_list', 'bullet_list'],
    ['link'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  previewUrl = signal<string | ArrayBuffer | null>(null);
  selectedFile = signal<File | null>(null);

  //----methods----
  initBlogForm() {
    this.blogForm = this._fb.nonNullable.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(55)]],
      content: ['', [this.contentValidator(500000)]],
    });
  }

  patchBlogForm(blog: IBlogDetails) {
    this.blogForm.patchValue({
      title: blog.title,
      content: blog.content,
    });
    this.previewUrl.set(blog.image);
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (!file) return;

    const maxSize = 2 * 1024 * 1024;

    if (file.size > maxSize) {
      this._snackbar.error('Image must be less than 2MB');
      (event.target as HTMLInputElement).value = '';
      return;
    }

    this.selectedFile.set(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl.set(reader.result);
    };

    reader.readAsDataURL(file);
  }

  onFormSubmit() {
    this.isFormSubmitted.set(true);
    if (this.blogForm.valid) {
      if (!this.isEditMode && !this.selectedFile()) {
        this._snackbar.error('Please add an image');
        return;
      }

      this.isFormLoading.set(true);

      const blogFormValues = this.blogForm.getRawValue();

      const formData = new FormData();

      formData.append('title', blogFormValues.title);
      if(this.selectedFile()){
        formData.append('image', this.selectedFile()!);
      }
      formData.append('content', blogFormValues.content);

      this.blogFormData.emit(formData);
    } else {
      this._snackbar.error('Please Provide all details');
      this.blogForm.markAllAsDirty();
      this.blogForm.markAllAsTouched();
    }
  }

  contentValidator(max: number): ValidatorFn {
    return (control: AbstractControl) => {
      const value = control.value as string;

      if (!value || value === '<p><br></p>') {
        return { required: true };
      }

      // Remove HTML tags
      const plainText = value.replace(/<[^>]*>/g, '').trim();

      if (plainText.length === 0) {
        return { required: true };
      }

      if (plainText.length > max) {
        return { maxlength: true };
      }

      return null;
    };
  }

  getBlogDetails() {
    this.checkIdValid();

    this._blogService
      .findBlogDetails(this.id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.patchBlogForm(res.data);
        },
        error: (err: IErrorResponse) => {
          this._snackbar.error(err.message);
        },
      });
  }

  checkIdValid() {
    if (!this.id) {
      this._router.navigate(['/']);
    }
  }

  get imageError() {
    const file = this.selectedFile();

    if (this.isFormSubmitted() && !file) {
      return 'Image is requred';
    } else {
      return;
    }
  }

  get titleError(): string | null {
    const control = this.blogForm.get('title');

    if (!control || control.valid || !control.touched) return null;

    if (control.hasError('required')) {
      return 'Title is required';
    }

    if (control.hasError('maxlength')) {
      return 'Title is too long';
    }

    if (control.hasError('minlength')) {
      return 'Title is too short';
    }

    return 'Invalid value';
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.initBlogForm();
    this.editor = new Editor();
    if (this.id) {
      this.getBlogDetails();
    }
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.blogForm.reset();
  }
}
