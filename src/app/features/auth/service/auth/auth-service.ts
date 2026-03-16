import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ISuccessResponse, IBaseResponse } from 'app/types/api-response.types';
import { IPayload, IUserLogin } from '../../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private API_ENDPOINT = 'auth';

  currUser = signal<IPayload | null>(null);

  getCurrUser() {
    return this.currUser();
  }

  setCurrUser(user: IPayload) {
    this.currUser.set(user);
  }

  clearCurrUser() {
    this.currUser.set(null);
  }

  fetchCurrUser() {
    return this._http.get<ISuccessResponse<IPayload>>(`${this.API_ENDPOINT}/me`);
  }

  login(data: IUserLogin) {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}/login`, data);
  }

  logoutUser() {
    return this._http.post<IBaseResponse>(`${this.API_ENDPOINT}/logout`, {});
  }
}
