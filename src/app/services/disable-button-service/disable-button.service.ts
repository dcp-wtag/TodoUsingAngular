import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DisableButtonService {
  disableButton = new Subject<boolean>();
}
