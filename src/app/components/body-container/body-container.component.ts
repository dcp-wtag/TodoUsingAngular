import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveLinkService } from 'src/app/services/active-link-service/active-link.service';
import { DisableButtonService } from 'src/app/services/disable-button-service/disable-button.service';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner-service/error-success-spinner.service';
import { AddTaskUiService } from '../../services/add-task-ui-service/add-task-ui.service';
import { EmptyTaskService } from '../../services/empty-task-service/empty-task.service';

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
  @ViewChild('buttonContainer') buttonContainer!: ElementRef;

  constructor(
    private router: Router,
    private addTaskUiService: AddTaskUiService,
    private emptyTaskService: EmptyTaskService,
    private errorSuccessSpinnerService: ErrorSuccessSpinnerService,
    private disableButtonSubject: DisableButtonService,
    private route: ActivatedRoute,
    private activeLinkService: ActiveLinkService
  ) {
    this.disableButtonSubject.disableButton.subscribe((val) => {
      val
        ? this.buttonContainer.nativeElement.classList.add('disabledbutton')
        : this.buttonContainer.nativeElement.classList.remove('disabledbutton');
    });

    this.activeLinkService.activeLinkSubject.subscribe((val) => {
      if (val == 'all') {
        this.disableAllButton.nativeElement.classList.add('active');
        this.disableIncompleteButton.nativeElement.classList.remove('active');
        this.disableCompleteButton.nativeElement.classList.remove('active');
      } else if (val == 'incomplete') {
        this.disableIncompleteButton.nativeElement.classList.add('active');
        this.disableAllButton.nativeElement.classList.remove('active');
        this.disableCompleteButton.nativeElement.classList.remove('active');
      } else {
        this.disableCompleteButton.nativeElement.classList.add('active');
        this.disableIncompleteButton.nativeElement.classList.remove('active');
        this.disableAllButton.nativeElement.classList.remove('active');
      }
    });
  }

  onCreateButtonPressed() {
    if (this.emptyTaskService.emptyTaskShow) {
      this.emptyTaskService.emptyTaskSubject.next(false);
    }
    this.addTaskUiService.toggleAddTask();
  }

  onFilterButtonPressed(filterName: string) {
    this.activeLinkService.activeLinkSubject.next(filterName);

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
