import { HttpEvent, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { TokenStorageService } from '../service/token-storage-service.service';
import { Observable } from 'rxjs';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private token: TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.token.getToken();
        console.log("token : " + token);
        if (token != null) {
            request = request.clone
                ({
                    headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
                });
        }
        console.log('Intercepted HTTP call', request);
        return next.handle(request);
    }
}