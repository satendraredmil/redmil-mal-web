import { Routes } from '@angular/router';
import { Error404Component } from './shared/maintenance/error-404/error-404.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DLayoutComponent } from './layout/dashboard/d-layout/d-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { loggedinGuard } from './core/guards/loggedIn/loggedin.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login', component:LoginPageComponent, canActivate:[authGuard] },
    { path: 'dashboard', component: DLayoutComponent, canActivate:[loggedinGuard] },


    {path:'**', component:Error404Component}
];
