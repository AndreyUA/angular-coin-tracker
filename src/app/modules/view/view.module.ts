import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Another libraries
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

// Modules
import { AppRoutingModule } from 'src/app/modules/routes/app-routing.module';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { familyReducer } from 'src/app/state/family/family.reducer';
import { budgetsReducer } from 'src/app/state/budgets/budgets.reducer';
import { postsReducer } from 'src/app/state/posts/posts.reducer';
import { todosReducer } from 'src/app/state/todo/todo.reducer';

// Directives
import { PrivateRouteDirective } from 'src/app/directives/private-route.directive';
import { PublicRouteDirective } from 'src/app/directives/public-route.directive';

// Components
import { ViewComponent } from './view.component';
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
import { PostItemComponent } from './components/post-item/post-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { RecycleComponent } from './components/recycle/recycle.component';

// Environment
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    HeaderComponent,
    HomePageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    FamilyPageComponent,
    TablePageComponent,
    NotFoundComponent,
    StatisticPageComponent,
    PlansPageComponent,
    DashboardPageComponent,
    SpinnerComponent,
    TodoItemComponent,
    PostItemComponent,
    FooterComponent,
    ModalComponent,
    PrivateRouteDirective,
    PublicRouteDirective,
    ViewComponent,
    RecycleComponent,
  ],
  exports: [ViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      family: familyReducer,
      budgets: budgetsReducer,
      posts: postsReducer,
      todos: todosReducer,
    }),
    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: false })
      : [],
    SnotifyModule,
  ],
  providers: [
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
  ],
})
export class ViewModule {}
