import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { budgetReducer } from './state/transaction/transaction.reducer';
import { familyReducer } from './state/family/family.reducer';

// Modules
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptorService } from './auth-interceptor';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterPageComponent } from './auth-page/register-page/register-page.component';
import { LoginPageComponent } from './auth-page/login-page/login-page.component';
import { FamilyPageComponent } from './family-page/family-page.component';
import { TablePageComponent } from './table-page/table-page.component';
import { ProgressPageComponent } from './progress-page/progress-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { StatisticPageComponent } from './statistic-page/statistic-page.component';

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
    ProgressPageComponent,
    NotFoundComponent,
    StatisticPageComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      transactions: budgetReducer,
      family: familyReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: false }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
