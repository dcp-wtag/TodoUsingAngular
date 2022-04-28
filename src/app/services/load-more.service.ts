import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadMoreService {
  subject = new Subject<boolean>();
  buttonName = new Subject<string>();
}
