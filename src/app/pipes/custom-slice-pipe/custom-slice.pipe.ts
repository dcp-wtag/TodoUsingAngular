import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../model/Task';
import { AddTaskUiService } from '../../services/add-task-ui-service/add-task-ui.service';
import { EmptyTaskService } from '../../services/empty-task-service/empty-task.service';
import { LoadMoreService } from '../../services/load-more-show-less-service/load-more.service';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  constructor(
    private loadMoreService: LoadMoreService,
    private emptyTaskService: EmptyTaskService,
    private showAddTaskService: AddTaskUiService
  ) {}
  transform(value: Task[], from: number, to: number): any {
    if (value.length > to) {
      this.loadMoreService.loadMoreSubject.next(true);
      this.loadMoreService.showLessSubject.next(false);
    } else {
      if (to > 12) {
        this.loadMoreService.loadMoreSubject.next(false);
        this.loadMoreService.showLessSubject.next(true);
      }
    }
    if (value.length === 0 && !this.showAddTaskService.showAddTask) {
      this.emptyTaskService.emptyTaskSubject.next(true);
    } else {
      this.emptyTaskService.emptyTaskSubject.next(false);
    }
    return value.slice(from, to);
  }
}
