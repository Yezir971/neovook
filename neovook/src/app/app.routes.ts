import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    {
        path:"",
        component: Home
    }, 
    {
        path:"inscription",
        component: Login,
        canActivate: [authGuard]
    }, 
];
