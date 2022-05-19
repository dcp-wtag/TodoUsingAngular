import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadMoreService {
  loadMoreSubject = new Subject<boolean>();
  showLessSubject = new Subject<boolean>();
}
