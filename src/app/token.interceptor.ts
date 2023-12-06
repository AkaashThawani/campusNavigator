import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // Check if the request is to your backend API
    if (request.url.startsWith('localhost:8000')) {
      // Get the token from localStorage
      const token = JSON.parse(localStorage.getItem('userData') as any)?.access_token;

      // Clone the request and add the Authorization header with the token
      const modifiedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pass the modified request to the next handler
      return next.handle(modifiedRequest);
    }

    // If the request is not to your backend API, proceed without modification
    return next.handle(request);
  }
}