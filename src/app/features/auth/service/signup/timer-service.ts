import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { IUserEmail } from '@features/auth/models/signup.model';
import { SignupService } from './signup-service';
import { IErrorResponse } from 'app/types/api-response.types';
import { SnackbarService } from '@core/service/snackbar/snackbar-service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private _signupService = inject(SignupService);
  private _snackbarService = inject(SnackbarService);
  private _destroyRef = inject(DestroyRef);
  private _intervalId!: ReturnType<typeof setInterval>;
  timer = signal(0);

  setTimer(userEmail: IUserEmail) {
    this._signupService
      .getTimeLeft(userEmail)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (res) => {
          this.timer.set(res.data.timeLeft);
          // if intervel is running, clear it
          if (this._intervalId) {
            clearInterval(this._intervalId);
          }

          // in each second, reduce the time left by 1s: if time left is greater than 0 (time is left)
          this._intervalId = setInterval(() => {
            if (this.timer() > 0) {
              this.timer.update((val) => val - 1);
            } else {
              clearInterval(this._intervalId);
            }
          }, 1000);
        },
        error: (err: IErrorResponse) => {
          this._snackbarService.error(err.message);
        },
      });
  }
}
