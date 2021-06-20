import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomePageComponent } from './home-page/home-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterPageComponent } from './auth-page/register-page/register-page.component';
import { LoginPageComponent } from './auth-page/login-page/login-page.component';
import { FamilyPageComponent } from './family-page/family-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth', redirectTo: 'auth/register', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthPageComponent,
    children: [
      { path: 'register', component: RegisterPageComponent },
      { path: 'login', component: LoginPageComponent },
    ],
  },
  { path: 'family', component: FamilyPageComponent },
  { path: 'table', component: TablePageComponent },
  { path: 'progress', component: ProgressPageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
