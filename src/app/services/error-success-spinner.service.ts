import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorSuccessSpinnerService {
  errorSubject: Subject<boolean> = new Subject<boolean>();
  successSubject: Subject<boolean> = new Subject<boolean>();
  isLoadingSubject: Subject<boolean> = new Subject<boolean>();
  successTextSubject: Subject<string> = new Subject<string>();
  errorTextSubject: Subject<string> = new Subject<string>();

  constructor() {}
}
