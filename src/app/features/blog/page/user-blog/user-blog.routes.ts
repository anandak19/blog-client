import { Routes } from '@angular/router';
import { CreateBlog } from './pages/create-blog/create-blog';
import { ViewMyOneBlog } from './pages/view-my-one-blog/view-my-one-blog';
import { ViewMyBlogs } from './pages/view-my-blogs/view-my-blogs';
import { EditMyOneBlog } from './pages/edit-my-one-blog/edit-my-one-blog';

export const userBlogRoutes: Routes = [
  {
    path: '',
    component: ViewMyBlogs,
  },
  {
    path: 'create',
    component: CreateBlog,
  },
  {
    path: ':id',
    component: ViewMyOneBlog,
  },
  {
    path: ':id/edit',
    component: EditMyOneBlog,
  },
];
