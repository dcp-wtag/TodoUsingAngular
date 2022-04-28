import { Pipe, PipeTransform } from '@angular/core';
import { KeywordService } from '../services/keyword.service';
import { Task } from '../Task';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  constructor(private keywordService: KeywordService){}

  transform(value: Task[], ...args: string[]): Task[] {
    if(args[1] == 'incomplete') return value.filter((task) => task.isDone == false && task.text.includes(this.keywordService.keyword));
    else if(args[1] == 'complete') return value.filter((task) => task.isDone == true && task.text.includes(this.keywordService.keyword));
    else return value.filter((task) => task.text.includes(this.keywordService.keyword));
  }
}
