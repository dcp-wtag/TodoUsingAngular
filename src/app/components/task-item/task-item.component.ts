import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements AfterViewInit {
  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter();
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter();
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

  constructor() {}

  ngAfterViewInit(): void {}

  onDelete(task: Task) {
    this.spinnerFunction(this.onDeleteTask, task);
  }

  onEdit(task: Task) {
    this.isEditing = true;
  }

  onSaveEditedTask(task: Task, text: string) {
    if (text && task.text != text) {
      task.text = text;
      this.spinnerFunction(this.onUpdateTask, task);
    }
    this.isEditing = false;
  }

  onComplete(task: Task) {
    this.spinnerFunction(this.onCompleteTask, task);
  }

  onCompleteFromAddTask(task: Task, text: string) {
    if (text && task.text != text) {
      task.text = text;
      this.onUpdateTask.emit(task);
    }
    this.onComplete(task);
    this.isEditing = false;
  }

  spinnerFunction(callBack: any, task: Task): void {
    this.disp = 'block';
    this.val = '1.5px';
    setTimeout(() => {
      callBack.emit(task);
      this.disp = 'none';
      this.val = 0;
    }, 500);
  }
}
