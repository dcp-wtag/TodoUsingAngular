import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmptyTaskService {
  emptyTaskShow!: boolean;
  emptyTaskSubject = new Subject<boolean>();
  constructor() {}
}
