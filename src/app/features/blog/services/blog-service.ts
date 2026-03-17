import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  HttpResponse,
  IBaseResponse,
  IPaginatedResult,
  ISuccessResponse,
} from 'app/types/api-response.types';
import { IPaginationQuery } from 'app/types/query-filters.types';
import { IListBlog } from '../models/blog.interface';

export type IFindAllBlog = ISuccessResponse<IPaginatedResult<IListBlog>>;

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private _httpClient = inject(HttpClient);
  private readonly API_ENDPOINT = 'blogs';

  createBlog(formData: FormData) {
    return this._httpClient.post<IBaseResponse>(`${this.API_ENDPOINT}/user/create`, formData);
  }

  // pending
  updateBlog(formData: FormData) {
    return this._httpClient.patch<IBaseResponse>(`${this.API_ENDPOINT}/user`, formData);
  }

  findAll(pagination: IPaginationQuery) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this._httpClient.get<IFindAllBlog>(`${this.API_ENDPOINT}`, { params });
  }

  findAllUsersBlogs(pagination: IPaginationQuery) {
    const params = new HttpParams({ fromObject: { ...pagination } });
    return this._httpClient.get<IFindAllBlog>(`${this.API_ENDPOINT}/user/all`, { params });
  }

  deleteOneBlog(blogId: string) {
    return this._httpClient.delete<HttpResponse>(`${this.API_ENDPOINT}/user/${blogId}`);
  }
}
