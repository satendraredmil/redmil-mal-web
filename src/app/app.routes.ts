import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DLayoutComponent } from './layout/dashboard/d-layout/d-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { DDashboardPageComponent } from './layout/dashboard/d-dashboard-page/d-dashboard-page.component';

export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path:'login', component:LoginPageComponent},
    { path: '', component: DLayoutComponent, 
        //canActivate:[authGuard] ,
        title:"Dashboard", children:[
        {path:'dashboard', component:DDashboardPageComponent}
        ]
    },


    {path:'**', redirectTo: '/login'}
];
