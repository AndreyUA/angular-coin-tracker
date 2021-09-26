import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';

import { createBearerToken } from 'src/app/utils/headerToken';

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (createBearerToken().length > 7) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', createBearerToken()),
      });

      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
