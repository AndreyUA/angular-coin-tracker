import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');

    if (token) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('x-auth-token', token),
      });

      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
