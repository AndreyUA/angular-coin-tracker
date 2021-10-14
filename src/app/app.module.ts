import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules
import { ViewModule } from './modules/view/view.module';

// Services
import { AuthInterceptorService } from './interceptor/auth-interceptor';
import { AuthGuard } from './services/auth-guard.service';
import { UserGuard } from './services/user-guard.service';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    ViewModule,
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
