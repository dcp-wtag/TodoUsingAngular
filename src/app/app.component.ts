import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isSplash: boolean = true;
  isSuccess: boolean = false;
  isError: boolean = false;
  isLoading: boolean = false;
  constructor() {
    setTimeout(() => {
      this.isSplash = false;
    }, 1000);
  }
}
