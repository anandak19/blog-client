import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { AuthService } from '@features/auth/service/auth/auth-service';
import { MatFormField, MatLabel, MatError, MatSuffix } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  imports: [
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    ReactiveFormsModule,
    LoadingButton,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  //----injections----
  private _fb = inject(FormBuilder);
  private _snackbar = inject(SnackbarService);
  private _router = inject(Router);
  private _destroyRef = inject(DestroyRef);
  private _authService = inject(AuthService);

  //----properties----
  loginForm!: FormGroup;

  hidePassword = signal(true);

  isLoading = signal(false);
  isSubmitted = signal(false);

  //----methods----
  initLoginForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  submitForm() {
    this.isSubmitted.set(true);

    if (this.loginForm.valid) {
      this.isLoading.set(true);

      const formValues = this.loginForm.getRawValue();
      console.log(formValues);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  navigateSignup() {
    this._router.navigate(['/signup']);
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.initLoginForm();
  }
}

//----injections----
//----properties----
//----methods----
//----lifecycle hooks----
