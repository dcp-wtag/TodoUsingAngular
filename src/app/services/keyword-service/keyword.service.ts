import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  keyword: string = '';
  subject = new Subject<string>();
}
