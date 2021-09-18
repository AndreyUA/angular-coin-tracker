import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Another libraries
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { familyReducer } from './state/family/family.reducer';
import { budgetsReducer } from './state/budgets/budgets.reducer';
import { postsReducer } from './state/posts/posts.reducer';
import { todosReducer } from './state/todo/todo.reducer';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth-interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { UserGuard } from './services/user-guard.service';

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
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';

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
    SpinnerComponent,
    TodoItemComponent,
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
      todos: todosReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: false }),
    SnotifyModule,
  ],
  providers: [
    AuthGuard,
    UserGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
