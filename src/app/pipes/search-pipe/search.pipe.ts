import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../../model/Task';
import { DisableButtonService } from '../../services/disable-button-service/disable-button.service';
import { KeywordService } from '../../services/keyword-service/keyword.service';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  constructor(
    private keywordService: KeywordService,
    private disableButtonService: DisableButtonService
  ) {}

  transform(value: Task[], ...args: string[]): Task[] {
    var incompleteTask, completeTask, allTask;
    incompleteTask = value.filter(
      (task) =>
        task.isDone == false && task.text.includes(this.keywordService.keyword)
    );
    completeTask = value.filter(
      (task) =>
        task.isDone == true && task.text.includes(this.keywordService.keyword)
    );
    allTask = value.filter((task) =>
      task.text.includes(this.keywordService.keyword)
    );
    if (incompleteTask.length + completeTask.length + allTask.length == 0) {
      this.disableButtonService.disableButton.next(true);
    } else {
      this.disableButtonService.disableButton.next(false);
    }
    if (args[1] == 'incomplete') {
      return incompleteTask;
    } else if (args[1] == 'complete') {
      return completeTask;
    } else {
      return allTask;
    }
  }
}
