import { Component, Input, OnInit } from '@angular/core';
import { AddTaskUiService } from 'src/app/services/add-task-ui.service';
import { KeywordService } from 'src/app/services/keyword.service';
import { Task } from 'src/app/Task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() state!: string;
  showAddTask!: boolean;

  tasks: Task[] = [];
  text: string = '';
  isDone: boolean = false;

  constructor(
    private taskService: TaskService,
    private addTaskUiService: AddTaskUiService,
    private keywordService: KeywordService
  ) {
    this.addTaskUiService
      .onToggle()
      .subscribe((val) => (this.showAddTask = val));
    this.showAddTask = this.addTaskUiService.showAddTaskValue();
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks.reverse();
      if (this.state == 'incomplete') {
        this.tasks = this.tasks.filter((task) => task.isDone == false);
      } else if (this.state == 'complete') {
        this.tasks = this.tasks.filter((task) => task.isDone == true);
      }
      console.log(this.keywordService.keyword);
    });

    this.keywordService.subject.subscribe((task) => {
      console.log('hello');
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
  }

  onAddTask() {
    if (this.text.length == 0) {
      alert('Please enter a task.');
    } else {
      const newTask = {
        text: this.text,
        createdAt: new Date(),
        isDone: false,
      };
      this.taskService.addTask(newTask).subscribe((task) => {
        if (this.state != 'complete') this.tasks.unshift(task);
      });
      this.text = '';
      this.addTaskUiService.closeAddTask();
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
}
