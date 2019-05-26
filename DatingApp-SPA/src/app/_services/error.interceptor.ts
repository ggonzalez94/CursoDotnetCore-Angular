import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, throwIfEmpty } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse){
                    if (error.status === 401){
                        return throwError(error.statusText);
                    }
                    const applicationError = error.headers.get('Application-Error'); // Error global controlado por la API(500)
                    if (applicationError) {
                        return throwError(applicationError);
                    }
                    const serverError = error.error;
                    console.error(serverError);
                    let modalStateErrors = '';
                    if (serverError && typeof serverError === 'object') { // Error de validación del modelo en la API(devuelve objeto)
                        for (const key in serverError.errors) { // En .Net Core 2.2 viene un nivel mas adentro en errors
                            if (serverError.errors[key]) {
                                modalStateErrors += serverError.errors[key] + '\n';
                            }
                        }
                    }
                    return throwError(modalStateErrors || serverError || 'Server Error');
                }
            })
        );
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
}