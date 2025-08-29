import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { authGuard } from './guard/auth-guard';
import { Signup } from './pages/signup/signup';
import { publicGuardGuard } from './guard/public-guard-guard';
import { Post } from './pages/post/post';

export const routes: Routes = [
    {
        path:"",
        component: Home
    }, 
    {
        path:"inscription",
        component: Signup,
        canActivate: [publicGuardGuard]
    }, 
    {
        path:"connexion",
        component: Login,
        canActivate: [publicGuardGuard]
    }, 
    {
        path:"post",
        component: Post,
        canActivate: [authGuard]
    }, 
];
