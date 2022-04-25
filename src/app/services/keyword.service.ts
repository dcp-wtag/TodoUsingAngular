import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KeywordService {
  keyword: string = '';
  subject = new Subject<any>();

  constructor() {}

  showKeyword(): string {
    this.subject.asObservable().subscribe((val) => {
      this.keyword = val;
    });
    return this.keyword;
  }
}
