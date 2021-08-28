import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { familyReducer } from './state/family/family.reducer';
import { budgetsReducer } from './state/budgets/budgets.reducer';
import { postsReducer } from './state/posts/posts.reducer';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth-interceptor';
import { AuthGuard } from './auth-guard.service';
import { UserGuard } from './user-guard.service';

// Directives
import { PrivateRouteDirective } from './directives/private-route.directive';
import { PublicRouteDirective } from './directives/public-route.directive';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { RegisterPageComponent } from './pages/auth-page/register-page/register-page.component';
import { LoginPageComponent } from './pages/auth-page/login-page/login-page.component';
import { FamilyPageComponent } from './pages/family-page/family-page.component';
import { TablePageComponent } from './pages/table-page/table-page.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { PlansPageComponent } from './pages/plans-page/plans-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    FamilyPageComponent,
    TablePageComponent,
    NotFoundComponent,
    StatisticPageComponent,
    PrivateRouteDirective,
    PublicRouteDirective,
    PlansPageComponent,
    DashboardPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      family: familyReducer,
      budgets: budgetsReducer,
      posts: postsReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: false }),
  ],
  providers: [
    AuthGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
