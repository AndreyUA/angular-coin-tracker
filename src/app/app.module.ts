import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app-routing.module';

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

@NgModule({
  declarations: [AppComponent, HeaderComponent, HomePageComponent, AuthPageComponent, RegisterPageComponent, LoginPageComponent, FamilyPageComponent, TablePageComponent, ProgressPageComponent, NotFoundComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
