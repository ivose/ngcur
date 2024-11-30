import { bootstrapApplication } from '@angular/platform-browser';
import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptor, HttpRequest, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // const req = request.clone({
    //     headers: request.headers.set('X-DEBUG', 'TESTING'),
    // });
    console.log("[Outgoing Request]");
    console.log(request);
    return next(request).pipe(tap({
        next: event => {
            if(event.type === HttpEventType.Response) {
                console.log("[Incoming Response]");
                console.log(event.status);
                console.log(event.body);
            }
        }
    }));
}

@Injectable()
class LoggingInterceptorC implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req);
  }
}

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(
            withInterceptors([loggingInterceptor])
        ),
    ],
}).catch((err) => console.error(err));
