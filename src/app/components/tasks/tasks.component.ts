import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AddTaskUiService } from 'src/app/services/add-task-ui.service';
import { EmptyTaskService } from 'src/app/services/empty-task.service';
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
    private emptyTaskService: EmptyTaskService
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
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks.reverse();
      },
      (error) => {
        console.log(error);
      }
    );

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
        };
        this.taskService.addTask(newTask).subscribe((task) => {
          if (this.state != 'complete') {
            this.tasks = [task].concat(this.tasks);
          }
        });
        this.text = '';
        this.addTaskUiService.closeAddTask();
        this.none = 'none';
        this.blur = 0;
        this.to = 12;
      }, 1000);
    }
  }
  onUpdateTask(task: Task) {
    this.taskService.updateTask(task).subscribe();
  }

  onCompleteTask(task: Task) {
    if (this.state == 'incomplete') {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    }
    task.isDone = true;
    this.taskService.updateTask(task).subscribe();
  }

  loadMore() {
    if (this.buttonName == 'Show Less') {
      this.to = 12;
    } else {
      this.to += 12;
    }
  }
}
