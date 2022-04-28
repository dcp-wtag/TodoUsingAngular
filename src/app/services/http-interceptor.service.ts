import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Task } from '../Task';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<Task[]>,
    next: HttpHandler
  ): Observable<HttpEvent<Task[]>> {
    return next.handle(req).pipe(
      tap((evt) => {}),
      catchError((error) => {})
    );
  }
}
