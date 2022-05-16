import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AddTaskUiService } from 'src/app/services/add-task-ui.service';
import { EmptyTaskService } from 'src/app/services/empty-task.service';
import { ErrorSuccessSpinnerService } from 'src/app/services/error-success-spinner.service';
import { KeywordService } from 'src/app/services/keyword.service';
import { LoadMoreService } from 'src/app/services/load-more.service';
import { Task } from 'src/app/Task';
import { TaskService } from '../../services/task.service';

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

  tasks: Task[] = [];
  text: string = '';
  isDone: boolean = false;
  subtasks: Task[] = [];
  keyword: string = this.keywordService.keyword;
  from: number = 0;
  to: number = 12;
  none: string = 'none';
  blur: any = 0;
  isLoadMoreShow: boolean = false;
  buttonName: string = 'Load More';

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

    this.loadMoreService.subject.subscribe((val) => {
      this.isLoadMoreShow = val;
    });

    this.loadMoreService.buttonName.subscribe((val) => {
      this.buttonName = val;
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
    if (this.none != 'block') {
      this.text = this.sanitizeInputString(this.text);
      if (this.text.length == 0) {
        alert('Please enter a task.');
      } else {
        this.none = 'block';
        this.blur = '1.5px';

        setTimeout(() => {
          const newTask = {
            text: this.text,
            createdAt: new Date(),
            isDone: false,
            completedTimeText: '',
          };
          this.taskService.addTask(newTask).subscribe((task) => {
            this.tasks = [task].concat(this.tasks);
            this.addTaskUiService.closeAddTask();
          });
          this.text = '';
          this.none = 'none';
          this.blur = 0;
          this.to = 12;
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
    if (this.buttonName == 'Show Less') {
      this.errorSuccessSpinner.isLoadingSubject.next(true);
      setTimeout(() => {
        this.to = 12;
        this.errorSuccessSpinner.isLoadingSubject.next(false);
      }, 500);
    } else {
      // window.scrollTo(0, this.taskCount.nativeElement.scrollHeight);

      // this.taskCount.nativeElement.scroll({
      //   top: this.taskCount.nativeElement.scrollHeight,
      //   behavior: 'initial',
      // });

      this.errorSuccessSpinner.isLoadingSubject.next(true);

      setTimeout(() => {
        this.errorSuccessSpinner.isLoadingSubject.next(false);
        this.to += 12;
      }, 500);
    }
  }

  sanitizeInputString(inputString: string) {
    inputString = inputString.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, ' ');
    return inputString.trim();
  }

  // onNext() {
  //   if (
  //     this.from + 12 < this.tasks.length &&
  //     this.to + 12 < this.tasks.length
  //   ) {
  //     this.from += 12;
  //     this.to += 12;
  //   }
  // }
  // onPrev() {
  //   if (this.from - 12 > 0 && this.to - 12 > 0) {
  //     this.from -= 12;
  //     this.to -= 12;
  //   }
  // }
}
