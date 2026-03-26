import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Login } from '@features/auth/pages/login/login';
import { Signup } from '@features/auth/pages/signup/signup';
import { Home } from '@features/blog/page/home/home';
import { ViewOneBlog } from '@features/blog/page/view-one-blog/view-one-blog';
import { userBlogRoutes } from '@features/blog/page/user-blog/user-blog.routes';
import { authGuard } from '@core/guards/auth/auth-guard';
import { isLoginGuard } from '@core/guards/is-login/is-login-guard';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'blog/:id',
        component: ViewOneBlog,
      },

      {
        path: 'login',
        canActivate: [isLoginGuard],
        component: Login,
      },
      {
        path: 'signup',
        canActivate: [isLoginGuard],
        component: Signup,
      },

      {
        path: 'mine',
        canActivateChild: [authGuard],
        children: userBlogRoutes,
      },
    ],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
