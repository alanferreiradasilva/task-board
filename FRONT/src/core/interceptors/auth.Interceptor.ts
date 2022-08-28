import { TokenStore } from './../../stores/token/token.store';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStore: TokenStore) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {    
    if (!req.url.endsWith('/login')) {
        const authToken = this.tokenStore.getToken();
        
        if (authToken) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken}`
                }
            });
        }
    } else{
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(req);
  }
}