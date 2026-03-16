import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
    private _httpClient = inject(HttpClient)
    private readonly API_ENDPOINT = 'blogs'
}
