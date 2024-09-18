import { Routes } from '@angular/router';

import { DLayoutComponent } from './layout/dashboard/d-layout/d-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, title:"Login | Redmil Business Mall" },

  //Dashboard Start
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard/d-layout/d-layout.component').then(
        (D) => D.DLayoutComponent
      ),
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard ~ Redmil Business Mall',
        loadComponent: () =>
          import(
            './layout/dashboard/d-dashboard-page/d-dashboard-page.component'
          ).then((C) => C.DDashboardPageComponent),
      },

      //Mobile Prepaid Route
      {
        path: 'recharge/mobile-prepaid',
        title: 'Mobile Prepaid Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/mobile-prepaid/mobile-prepaid.component'
          ).then((Prepaid) => Prepaid.MobilePrepaidComponent),
      },

      //Mobile Postpaid Route
      {
        path: 'recharge/mobile-postpaid',
        title: 'Mobile Postpaid Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/mobile-postpaid/mobile-postpaid.component'
          ).then((Postpaid) => Postpaid.MobilePostpaidComponent),
      },

      //DTH Recharge Route
      {
        path: 'recharge/dth-recharge',
        title: 'DTH Recharge',
        loadComponent: () =>
          import('./pages/recharges/dth-recharge/dth-recharge.component').then(
            (DTH) => DTH.DthRechargeComponent
          ),
      },

      //Fastag Recharge Route
      {
        path: 'recharge/fastag-recharge',
        title: 'Fastag Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/fastag-recharge/fastag-recharge.component'
          ).then((Fastag) => Fastag.FastagRechargeComponent),
      },
    ],
  },


  { path: '**', redirectTo: '/login' },
];
