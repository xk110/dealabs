import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor() {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const started = Date.now();
        console.log(request);
        return next.handle(request).pipe(tap(event => {
            console.log(event);
            const elapsed = Date.now() - started;
            console.log(`Request for ${request.urlWithParams} took ${elapsed} ms.`);
            if (event instanceof HttpResponse) {
                console.log(`Response Received`);
            };
        }));
    }
}