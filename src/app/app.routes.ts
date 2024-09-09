import { Routes } from '@angular/router';
import { Error404Component } from './shared/maintenance/error-404/error-404.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DLayoutComponent } from './layout/dashboard/d-layout/d-layout.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login', component:LoginPageComponent},
    { path: 'dashboard', component: DLayoutComponent },


    {path:'**', component:Error404Component}
];
