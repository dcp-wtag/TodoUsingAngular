import { ChangeDetectorRef, Component } from '@angular/core';
import { ErrorSuccessSpinnerService } from './services/error-success-spinner-service/error-success-spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'TodoApp';
  isSplash: boolean = true;
  isSuccess!: boolean;
  isError!: boolean;
  isLoading: boolean = false;
  errorText: string = 'Failed';
  successText: string = 'Successful';

  constructor(
    private errorSuccessSpin: ErrorSuccessSpinnerService,
    private cdRef: ChangeDetectorRef
  ) {
    setTimeout(() => {
      this.isSplash = false;
    }, 1000);
    this.errorSuccessSpin.isLoadingSubject.subscribe((val) => {
      this.isLoading = val;
    });

    this.errorSuccessSpin.successSubject.subscribe((val) => {
      this.isSuccess = val;
      this.cdRef.detectChanges();
    });

    this.errorSuccessSpin.errorSubject.subscribe((val) => {
      this.isError = val;
      this.cdRef.detectChanges();
    });

    this.errorSuccessSpin.successTextSubject.subscribe((val) => {
      this.successText = val;
    });

    this.errorSuccessSpin.errorTextSubject.subscribe((val) => {
      this.errorText = val;
    });
  }
}
