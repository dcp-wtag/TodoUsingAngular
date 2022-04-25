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

  @ViewChild('myTextArea') textArea!: ElementRef;

  isEditing: boolean = false;

  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.textArea);
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task);
  }

  onEdit(task: Task) {
    this.isEditing = true;

    // this.onUpdateTask.emit(task);
  }

  onSaveEditedTask(task: Task, text: string) {
    if (text && task.text != text) {
      task.text = text;
      this.onUpdateTask.emit(task);
    }
    this.isEditing = false;
  }

  onComplete(task: Task) {
    this.onCompleteTask.emit(task);
  }

  onCompleteFromAddTask(task: Task, text: string) {
    if (text && task.text != text) {
      task.text = text;
      this.onUpdateTask.emit(task);
    }
    this.onCompleteTask.emit(task);
    this.isEditing = false;
  }
}
