import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IBaseResponse } from 'app/types/api-response.types';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private _httpClient = inject(HttpClient);
  private readonly API_ENDPOINT = 'blogs';

  createBlog(formData: FormData) {
    return this._httpClient.post<IBaseResponse>(`${this.API_ENDPOINT}/user`, formData);
  }
}
