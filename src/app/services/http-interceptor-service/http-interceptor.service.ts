import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Task } from '../../model/Task';
import { ErrorSuccessSpinnerService } from '../error-success-spinner-service/error-success-spinner.service';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private errorSuccessSpin: ErrorSuccessSpinnerService) {}
  intercept(
    req: HttpRequest<Task[]>,
    next: HttpHandler
  ): Observable<HttpEvent<Task[]>> {
    return next.handle(req).pipe(
      tap((response: any) => {
        if (response.type) {
          console.log(req.headers);
          //this.editedTextUpdatedService.isEditedTextUpdated.next(true);
          this.errorSuccessSpin.successSubject.next(true);
          setTimeout(() => {
            this.errorSuccessSpin.successSubject.next(false);
          }, 1000);
        }
      }),
      catchError((error: HttpErrorResponse) => {
        //this.editedTextUpdatedService.isEditedTextUpdated.next(false);
        this.errorSuccessSpin.errorSubject.next(true);

        return throwError(() => {
          setTimeout(
            () => this.errorSuccessSpin.errorSubject.next(false),
            1000
          );
          return error;
        });
      })
    );
  }
}
