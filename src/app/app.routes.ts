import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth/auth.guard';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { RechargepupComponent } from './shared/reusable-components/rechargepup/rechargepup.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, title: "Login | Redmil Business Mall" },

  //Dashboard Start
  {
    path: '',
    loadComponent: () =>
      import('./layout/dashboard/d-layout/d-layout.component').then(
        (D) => D.DLayoutComponent
      ), 
      canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard ~ Redmil Business Mall',
        loadComponent: () =>
          import(
            './layout/dashboard/d-dashboard-page/d-dashboard-page.component'
          ).then((C) => C.DDashboardPageComponent),
      },

      //Recharge Route start here
      {
        path: 'recharge',
        title: 'Mobile Prepaid Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/layout-recharge/layout-recharge.component'
          ).then((L) => L.LayoutRechargeComponent),
        children: [
          //Mobile Prepaid Route
          {
            path: 'mobile-prepaid',
            title: 'Mobile Prepaid Recharge ~ Redmil',
            loadComponent: () =>
              import(
                './pages/recharges/mobile-prepaid/mobile-prepaid.component'
              ).then((Prepaid) => Prepaid.MobilePrepaidComponent),
          },
           //Mobile Postpaid Route
      {
        path: 'mobile-postpaid',
        title: 'Mobile Postpaid Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/mobile-postpaid/mobile-postpaid.component'
          ).then((Postpaid) => Postpaid.MobilePostpaidComponent),
      },

      //DTH Recharge Route
      {
        path: 'dth-recharge',
        title: 'DTH Recharge',
        loadComponent: () =>
          import('./pages/recharges/dth-recharge/dth-recharge.component').then(
            (DTH) => DTH.DthRechargeComponent
          ),
      },

      //Fastag Recharge Route
      {
        path: 'fastag-recharge',
        title: 'Fastag Recharge ~ Redmil',
        loadComponent: () =>
          import(
            './pages/recharges/fastag-recharge/fastag-recharge.component'
          ).then((Fastag) => Fastag.FastagRechargeComponent),
      },
        ]
      },






    ],
  },

  // //Fastag Recharge Route
  // {
  //   path: 'recharge/fastag',
  //   title: 'Fastag ~ Redmil',
  //   component: RechargepupComponent
  // },


  { path: '**', redirectTo: '/login' },
];
