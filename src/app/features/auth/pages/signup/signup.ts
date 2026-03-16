import { Component, DestroyRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/select';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { IOtpVerify, IUserEmail, IUserSignup } from '@features/auth/models/signup.model';
import { IOtpTime, SignupService } from '@features/auth/service/signup/signup-service';
import { TimerService } from '@features/auth/service/signup/timer-service';
import {
  emailValidator,
  nameValidator,
  noWhitespaceValidator,
  passwordMatchValidator,
  passwordValidator,
} from '@shared/validators/forms.validators';
import { LoadingButton } from '@shared/components/ui/loading-button/loading-button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IBaseResponse, IErrorResponse } from 'app/types/api-response.types';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    MatFormField,
    MatLabel,
    MatError,
    MatIcon,
    LoadingButton,
  ],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup implements OnInit {
  //----injections----
  private _formBuilder = inject(FormBuilder);
  private _signupService = inject(SignupService);
  private _destroyRef = inject(DestroyRef);
  private _snackbarService = inject(SnackbarService);
  private _timerService = inject(TimerService);
  private _router = inject(Router);

  //----properties----
  @ViewChild('stepper') stepper!: MatStepper;

  signupForm!: FormGroup;
  otpForm!: FormGroup;

  isSignupSubmitted = signal(false);
  isSignupLoading = signal(false);
  isOtpFormSubmitted = signal(false);
  isOtpFormLoading = signal(false);
  isOtpResendLoading = signal(false);

  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  userEmail = signal<IUserEmail>({} as IUserEmail);

  timeLeft = this._timerService.timer;
  //----methods----
  signupFormInit() {
    this.signupForm = this._formBuilder.group({
      firstName: ['', [Validators.required, nameValidator, noWhitespaceValidator]],
      lastName: ['', [Validators.required, nameValidator, noWhitespaceValidator]],
      email: ['', [Validators.required, emailValidator, noWhitespaceValidator]],
      passwords: this._formBuilder.group(
        {
          password: ['', [Validators.required, Validators.minLength(5), passwordValidator]],
          confirmPassword: ['', [Validators.required]],
        },
        { validators: passwordMatchValidator },
      ),
    });
  }

  onSignupFormSubmit() {
    this.isSignupSubmitted.set(true);
    if (this.signupForm.valid) {
      this.isSignupLoading.set(true);
      const formValues = this.signupForm.getRawValue();

      const signupData: IUserSignup = {
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password: formValues.passwords.password,
      };

      this._signupService
        .verifyEmail(signupData)
        .pipe(
          finalize(() => this.isSignupLoading.set(false)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe({
          next: (res: IBaseResponse) => {
            this._snackbarService.success(res.message);
            this.userEmail.update((curr) => ({ ...curr, email: signupData.email }));
            this._timerService.setTimer(this.userEmail());
            this.stepper.next();
          },
          error: (err: IErrorResponse) => {
            this._snackbarService.error(err.message);
          },
        });
    } else {
      this.signupForm.markAllAsTouched();
      this.signupForm.markAllAsDirty();
    }
  }

  // error getter
  getSignupFormError(controlName: string) {
    const control = this.signupForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    return this.errorMessage(errors);
  }

  // error getter
  getPasswordErrors(controlName: string) {
    const control = this.signupForm.get('passwords')?.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;

    return this.errorMessage(errors);
  }

  // error getter
  passwordMatchError() {
    const control = this.signupForm.get('passwords');
    if (!control || !control.errors || !control.touched) return '';

    const errors = control?.errors;
    return this.errorMessage(errors);
  }

  // OTP
  otpFormInit() {
    this.otpForm = this._formBuilder.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });
  }

  onOtpFormSubmit() {
    // isOtpFormLoading
    this.isOtpFormSubmitted.set(true);
    if (this.otpForm.valid) {
      const optFormData = this.otpForm.getRawValue();

      const otpData: IOtpVerify = {
        email: this.userEmail().email,
        otp: String(optFormData.otp),
      };

      this.isOtpFormLoading.set(true);
      this._signupService
        .validateOtp(otpData)
        .pipe(
          finalize(() => this.isOtpFormLoading.set(false)),
          takeUntilDestroyed(this._destroyRef),
        )
        .subscribe({
          next: (res) => {
            this._snackbarService.success(res.message);
            this._router.navigate(['/login']);
          },
          error: (err: IErrorResponse) => {
            this._snackbarService.error(err.message);
          },
        });
    } else {
      this.otpForm.markAllAsDirty();
    }
  }

  resend() {
    this._signupService
      .resendOtp(this.userEmail())
      .pipe(
        finalize(() => this.isOtpResendLoading.set(true)),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe({
        next: (res) => {
          this._timerService.setTimer(this.userEmail());
          this._snackbarService.success(res.message);
        },
        error: (err: IErrorResponse) => {
          this._snackbarService.error(err.message);
        },
      });
  }

  // error getter
  getOtpError() {
    const control = this.otpForm.get('otp');
    if (!control || !control.errors || !control.touched) return '';
    const errors = control.errors;
    return this.errorMessage(errors);
  }

  navigateLogin() {
    this._router.navigate(['/login']);
  }

  stepBack() {
    this.stepper.previous();
  }

  // error getter
  errorMessage(errors: ValidationErrors) {
    if (errors['required']) return 'This field is required';

    if (errors['minlength'])
      return `Minimum ${errors['minlength'].requiredLength} characters required`;

    if (errors['maxLength'])
      return `Maximum ${errors['maxLength'].requiredLength} characters required`;

    if (errors['customError']) return errors['customError'];

    return 'Invalid field';
  }

  //----lifecycle hooks----
  ngOnInit(): void {
    this.signupFormInit();
    this.otpFormInit();
  }
}
