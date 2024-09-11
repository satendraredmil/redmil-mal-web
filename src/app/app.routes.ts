import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DLayoutComponent } from './layout/dashboard/d-layout/d-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login', component:LoginPageComponent},
    { path: 'dashboard_link', component: DLayoutComponent, 
        //canActivate:[authGuard] ,
        title:"Dashboard"
    },


    {path:'**', redirectTo: '/login'}
];
