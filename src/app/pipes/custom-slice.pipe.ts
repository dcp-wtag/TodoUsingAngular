import { Pipe, PipeTransform } from '@angular/core';
import { EmptyTaskService } from '../services/empty-task.service';
import { LoadMoreService } from '../services/load-more.service';
import { Task } from '../Task';

@Pipe({
  name: 'customSlice',
})
export class CustomSlicePipe implements PipeTransform {
  constructor(
    private loadMoreService: LoadMoreService,
    private emptyTaskService: EmptyTaskService
  ) {}
  transform(value: Task[], to: number): any {
    if (value.length > to) {
      this.loadMoreService.buttonName.next('Load More');
      this.loadMoreService.subject.next(true);
    } else {
      if (to > 12) {
        this.loadMoreService.buttonName.next('Show Less');
      } else {
        this.loadMoreService.subject.next(false);
      }
    }
    if (value.length === 0) {
      this.emptyTaskService.emptyTaskSubject.next(true);
    } else {
      this.emptyTaskService.emptyTaskSubject.next(false);
    }
    return value.slice(0, to);
  }
}
