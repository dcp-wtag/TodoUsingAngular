import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner-service/error-success-spinner.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements AfterViewInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<any> = new EventEmitter();
  @Output() onCompleteTask: EventEmitter<Task> = new EventEmitter();

  @ViewChild('cart') cartElement!: ElementRef;

  @ViewChild('myTextArea') set myTextArea(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.setSelectionRange(
        ref.nativeElement.value.length,
        ref.nativeElement.value.length
      );
      ref.nativeElement.focus();
    }
  }

  disp: string = 'none';
  val: any = 0;

  isEditing: boolean = false;
  completedTimeInDays!: number;

  constructor(private errorSuccessSpinnerService: ErrorSuccessSpinnerService) {}

  ngAfterViewInit(): void {}

  onDelete(task: Task) {
    this.errorSuccessSpinnerService.successTextSubject.next(
      `'${task.text}' is deleted Successfully`
    );
    this.errorSuccessSpinnerService.errorTextSubject.next(
      `Failed to delete '${task.text}'`
    );
    this.spinnerFunction(this.onDeleteTask, task);
  }

  onEdit(task: Task) {
    this.isEditing = true;
  }

  onSaveEditedTask(task: Task, text: string) {
    if (text && task.text != text) {
      const newTask = Object.assign({}, task);
      newTask.text = text;

      this.errorSuccessSpinnerService.successTextSubject.next(
        `'${task.text}' is updated Successfully`
      );
      this.errorSuccessSpinnerService.errorTextSubject.next(
        `Failed to update '${task.text}'`
      );

      this.spinnerFunction(this.onUpdateTask, { newTask: newTask, task: task });
    }
    this.isEditing = false;
  }

  onComplete(task: Task) {
    this.errorSuccessSpinnerService.successTextSubject.next(
      `'${task.text}' is completed Successfully`
    );
    this.errorSuccessSpinnerService.errorTextSubject.next(
      `Failed to complete '${task.text}'`
    );
    task.completedTimeText = this.getDifference(task.createdAt);
    this.spinnerFunction(this.onCompleteTask, task);
  }

  onCompleteFromAddTask(task: Task, text: string) {
    if (text && task.text != text) {
      const newTask = Object.create(task);
      newTask.text = text;

      this.onUpdateTask.emit({ newTask: newTask, task: task });
      // this.spinnerFunction(this.onUpdateTask, { newTask: newTask, task: task });
    }
    this.onComplete(task);
    this.isEditing = false;
  }

  spinnerFunction(callBack: any, task: any) {
    this.disp = 'block';
    this.val = '1.5px';
    setTimeout(() => {
      callBack.emit(task);
      this.disp = 'none';
      this.val = 0;
    }, 500);
  }

  getDifference(createdAt: any) {
    let completedTimeText;
    this.completedTimeInDays = Math.floor(
      (new Date().getTime() - new Date(createdAt).getTime()) /
        (1000 * 3600 * 24)
    );

    if (this.completedTimeInDays < 1) {
      completedTimeText = 'Completed in less than a day';
    } else if (this.completedTimeInDays == 1) {
      completedTimeText = 'Completed in a day';
    } else {
      completedTimeText = 'Completed in ' + this.completedTimeInDays + ' days';
    }
    return completedTimeText;
  }
}
