import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Services
import { AuthGuard } from './auth-guard.service';
import { UserGuard } from './user-guard.service';

// Components
import { HomePageComponent } from './home-page/home-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterPageComponent } from './auth-page/register-page/register-page.component';
import { LoginPageComponent } from './auth-page/login-page/login-page.component';
import { FamilyPageComponent } from './family-page/family-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
  {
    path: 'progress',
    component: ProgressPageComponent,
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
