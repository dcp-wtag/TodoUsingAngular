import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { EmptyTaskService } from 'src/app/services/empty-task.service';
import { LoadMoreService } from 'src/app/services/load-more.service';

@Component({
  selector: 'app-show-tasks',
  templateUrl: './show-tasks.component.html',
  styleUrls: ['./show-tasks.component.css'],
})
export class ShowTasksComponent implements OnInit, AfterViewInit {
  state: string = '';
  isShowEmptyTaskCart!: boolean;
  constructor(
    private router: Router,
    private loadMoreService: LoadMoreService,
    private emtpyTaskService: EmptyTaskService,
    private changeDetector: ChangeDetectorRef
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
      }, 0);
    });
  }
}
