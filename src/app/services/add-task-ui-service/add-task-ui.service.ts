import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddTaskUiService {
  showAddTask!: boolean;
  subject = new Subject<any>();

  constructor() {}

  toggleAddTask(): void {
    this.showAddTask = true;
    this.subject.next(this.showAddTask);
  }

  closeAddTask(): void {
    this.showAddTask = false;
    this.subject.next(this.showAddTask);
  }

  onToggle(): Observable<any> {
    return this.subject.asObservable();
  }

  showAddTaskValue(): boolean {
    this.subject.asObservable().subscribe((val) => (this.showAddTask = val));
    return this.showAddTask;
  }
}
