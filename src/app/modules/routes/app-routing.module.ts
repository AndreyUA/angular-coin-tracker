import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { AuthGuard } from '../../services/auth-guard.service';
import { UserGuard } from '../../services/user-guard.service';

// Components
import { HomePageComponent } from '../view/pages/home-page/home-page.component';
import { AuthPageComponent } from '../view/pages/auth-page/auth-page.component';
import { RegisterPageComponent } from '../view/pages/auth-page/register-page/register-page.component';
import { LoginPageComponent } from '../view/pages/auth-page/login-page/login-page.component';
import { FamilyPageComponent } from '../view/pages/family-page/family-page.component';
import { TablePageComponent } from '../view/pages/table-page/table-page.component';
import { PlansPageComponent } from '../view/pages/plans-page/plans-page.component';
import { DashboardPageComponent } from '../view/pages/dashboard-page/dashboard-page.component';
import { StatisticPageComponent } from '../view/pages/statistic-page/statistic-page.component';
import { NotFoundComponent } from '../view/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      {
        path: 'register',
        component: RegisterPageComponent,
        canActivate: [UserGuard],
      },
      {
        path: 'login',
        component: LoginPageComponent,
        canActivate: [UserGuard],
      },
    ],
  },
  { path: 'family', component: FamilyPageComponent, canActivate: [AuthGuard] },
  { path: 'table', component: TablePageComponent, canActivate: [AuthGuard] },
  { path: 'plans', component: PlansPageComponent, canActivate: [AuthGuard] },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'statistic',
    component: StatisticPageComponent,
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
