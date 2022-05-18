import { AddTaskUiService } from 'src/app/services/add-task-ui-service/add-task-ui.service';
import { EmptyTaskService } from '../../services/empty-task-service/empty-task.service';
import { LoadMoreService } from '../../services/load-more-show-less-service/load-more.service';
import { CustomSlicePipe } from './custom-slice.pipe';

describe('CustomSlicePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomSlicePipe(
      new LoadMoreService(),
      new EmptyTaskService(),
      new AddTaskUiService()
    );
    expect(pipe).toBeTruthy();
  });
});
