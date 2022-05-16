import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DisableButtonService } from 'src/app/services/disable-button.service';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner.service';
import { AddTaskUiService } from '../../services/add-task-ui.service';
import { EmptyTaskService } from '../../services/empty-task.service';

@Component({
  selector: 'app-body-container',
  templateUrl: './body-container.component.html',
  styleUrls: ['./body-container.component.css'],
})
export class BodyContainerComponent {
  isShownAddCart: boolean = false;
  allFilterButton!: boolean;
  incompleteFilterButton!: boolean;
  completeFilterButton!: boolean;

  @ViewChild('allButton') disableAllButton!: ElementRef;
  @ViewChild('incompleteButton') disableIncompleteButton!: ElementRef;
  @ViewChild('completeButton') disableCompleteButton!: ElementRef;

  constructor(
    private router: Router,
    private addTaskUiService: AddTaskUiService,
    private emptyTaskService: EmptyTaskService,
    private errorSuccessSpinnerService: ErrorSuccessSpinnerService,
    private disableButtonSubject: DisableButtonService,
    private route: ActivatedRoute
  ) {
    this.disableButtonSubject.disableButton.subscribe((val) => {
      this.disableAllButton.nativeElement.disabled = val;
      this.disableIncompleteButton.nativeElement.disabled = val;
      this.disableCompleteButton.nativeElement.disabled = val;
    });
    console.log(this.router.url);
    if (this.router.url == '/all' || this.router.url == '/') {
      setTimeout(() => {
        this.disableAllButton.nativeElement.classList.add('active');
        this.disableIncompleteButton.nativeElement.classList.add('remove');
        this.disableCompleteButton.nativeElement.classList.add('remove');
      }, 0);
    } else if (this.router.url == '/incomplete') {
      setTimeout(() => {
        this.disableIncompleteButton.nativeElement.classList.add('active');
        this.disableAllButton.nativeElement.classList.add('remove');
        this.disableCompleteButton.nativeElement.classList.add('remove');
      }, 0);
    } else {
      setTimeout(() => {
        this.disableCompleteButton.nativeElement.classList.add('active');
        this.disableIncompleteButton.nativeElement.classList.add('remove');
        this.disableAllButton.nativeElement.classList.add('remove');
      }, 0);
    }
  }

  onCreateButtonPressed() {
    if (this.emptyTaskService.emptyTaskShow) {
      this.emptyTaskService.emptyTaskSubject.next(false);
    }
    this.addTaskUiService.toggleAddTask();
  }

  onFilterButtonPressed(filterName: string) {
    if (filterName == 'all') {
      this.disableAllButton.nativeElement.classList.add('active');
      this.disableIncompleteButton.nativeElement.classList.remove('active');
      this.disableCompleteButton.nativeElement.classList.remove('active');
    } else if (filterName == 'incomplete') {
      this.disableIncompleteButton.nativeElement.classList.add('active');
      this.disableAllButton.nativeElement.classList.remove('active');
      this.disableCompleteButton.nativeElement.classList.remove('active');
    } else {
      this.disableCompleteButton.nativeElement.classList.add('active');
      this.disableIncompleteButton.nativeElement.classList.remove('active');
      this.disableAllButton.nativeElement.classList.remove('active');
    }

    this.errorSuccessSpinnerService.successTextSubject.next(
      `${filterName} task fetched`
    );
    this.errorSuccessSpinnerService.errorTextSubject.next(
      `unable to fetch ${filterName} task`
    );
    filterName = '/' + filterName;
    if (this.router.url != filterName) {
      this.errorSuccessSpinnerService.isLoadingSubject.next(true);

      setTimeout(() => {
        this.errorSuccessSpinnerService.isLoadingSubject.next(false);
        this.router.navigate([`${filterName}`], { relativeTo: this.route });
      }, 1000);
    }
  }
}
