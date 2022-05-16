import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmptyTaskService } from 'src/app/services/empty-task.service';
import { KeywordService } from 'src/app/services/keyword.service';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit, AfterViewInit {
  state: string = '';
  isShowEmptyTaskCart!: boolean;
  emptyTitle: string = "You didn't add any task. Please, add one.";
  constructor(
    private router: Router,
    private emtpyTaskService: EmptyTaskService,
    private keywordService: KeywordService
  ) {}

  ngOnInit(): void {
    this.state = this.router.url;
    this.state = this.state.slice(1);
  }

  ngAfterViewInit(): void {
    this.emtpyTaskService.emptyTaskSubject.subscribe((val) => {
      setTimeout(() => {
        this.isShowEmptyTaskCart = val;
        this.emtpyTaskService.emptyTaskShow = val;
        if (this.keywordService.keyword.length == 0) {
          if (this.state == 'complete')
            this.emptyTitle =
              "You didn't completed any task. Please, complete one.";
          else if (this.state == 'incomplete')
            this.emptyTitle =
              "You didn't have any incompleted task. Please, add one.";
          else this.emptyTitle = "You didn't add any task. Please, add one.";
        } else {
          this.emptyTitle = `You didn't have any ${
            this.state == 'complete'
              ? 'completed'
              : this.state == 'all'
              ? ''
              : 'incompleted'
          } task with '${this.keywordService.keyword}' search-key.`;
        }
      }, 0);
    });
  }
}
