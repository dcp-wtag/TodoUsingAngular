import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { AddTaskUiService } from 'src/app/services/add-task-ui-service/add-task-ui.service';
import { EmptyTaskService } from 'src/app/services/empty-task-service/empty-task.service';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner-service/error-success-spinner.service';
import { KeywordService } from 'src/app/services/keyword-service/keyword.service';
import { LoadMoreService } from 'src/app/services/load-more-show-less-service/load-more.service';
import { TaskService } from '../../../services/task-service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() state!: string;
  @ViewChild('taskCount') taskCount!: ElementRef;
  @ViewChild('task-item-component') scrollToBottom!: ElementRef;
  @ViewChild('textArea') set myTextArea(ref: ElementRef) {
    if (!!ref) {
      ref.nativeElement.focus();
    }
  }

  showAddTask!: boolean;
  isShowSpinBlur: boolean = false;
  tasks: Task[] = [];
  text: string = '';
  isDone: boolean = false;
  subtasks: Task[] = [];
  keyword: string = this.keywordService.keyword;
  from: number = 0;
  to: number = 12;
  isLoadMoreShow: boolean = false;
  isShowLessShow: boolean = false;

  constructor(
    private taskService: TaskService,
    private addTaskUiService: AddTaskUiService,
    private keywordService: KeywordService,
    private loadMoreService: LoadMoreService,
    private emptyTaskService: EmptyTaskService,
    private errorSuccessSpinner: ErrorSuccessSpinnerService
  ) {
    this.addTaskUiService.onToggle().subscribe((val) => {
      if (val && this.taskCount.nativeElement.childElementCount == 12) {
        this.to = 11;
      }
      this.showAddTask = val;
    });
    this.showAddTask = this.addTaskUiService.showAddTaskValue();
  }

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks) => (this.tasks = tasks.reverse()));

    this.keywordService.subject.subscribe((keyword) => {
      this.keywordService.keyword = keyword;
      this.keyword = keyword;
      this.to = 12;
    });

    this.loadMoreService.loadMoreSubject.subscribe((val) => {
      this.isLoadMoreShow = val;
    });

    this.loadMoreService.showLessSubject.subscribe((val) => {
      this.isShowLessShow = val;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    });
  }

  onDelete() {
    this.text = '';
    this.addTaskUiService.closeAddTask();
    this.to = 12;
    if (this.taskCount.nativeElement.childElementCount == 1) {
      this.emptyTaskService.emptyTaskSubject.next(true);
    }
  }

  onAddTask(event: any) {
    event.preventDefault();
    if (!this.isShowSpinBlur) {
      this.text = this.sanitizeInputString(this.text);
      if (this.text.length == 0) {
        alert('Please enter a task.');
      } else {
        this.errorSuccessSpinner.successTextSubject.next(
          `'${this.text}' is added Successfully`
        );
        this.errorSuccessSpinner.errorTextSubject.next(
          `Failed to add '${this.text}'`
        );

        this.isShowSpinBlur = true;

        setTimeout(() => {
          const newTask = {
            text: this.text,
            createdAt: new Date(),
            isDone: false,
            completedTimeText: '',
          };
          this.taskService.addTask(newTask).subscribe((task) => {
            this.addTaskUiService.closeAddTask();
            this.to = 12;
            this.text = '';
            this.tasks = [task].concat(this.tasks);
          });

          this.isShowSpinBlur = false;
        }, 500);
      }
    }
  }
  onUpdateTask(task: any) {
    this.taskService.updateTask(task.newTask).subscribe((val) => {
      task.task.text = task.newTask.text;
    });
  }

  onCompleteTask(task: Task) {
    const newTask = Object.assign({}, task);
    newTask.isDone = true;

    this.taskService.updateTask(newTask).subscribe((val) => {
      task.isDone = true;
      if (this.state == 'incomplete') {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      }
    });
  }

  loadMore() {
    this.errorSuccessSpinner.isLoadingSubject.next(true);
    setTimeout(() => {
      this.errorSuccessSpinner.isLoadingSubject.next(false);
      this.to += 12;
    }, 500);
  }

  showLess() {
    this.errorSuccessSpinner.isLoadingSubject.next(true);
    setTimeout(() => {
      this.errorSuccessSpinner.isLoadingSubject.next(false);
      this.to = 12;
    }, 500);
  }

  sanitizeInputString(inputString: string) {
    inputString = inputString.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, ' ');
    return inputString.trim();
  }
}
