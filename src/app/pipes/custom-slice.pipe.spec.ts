import { DisableButtonService } from '../services/disable-button.service';
import { EmptyTaskService } from '../services/empty-task.service';
import { LoadMoreService } from '../services/load-more.service';
import { CustomSlicePipe } from './custom-slice.pipe';

describe('CustomSlicePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomSlicePipe(
      new LoadMoreService(),
      new EmptyTaskService(),
      new DisableButtonService()
    );
    expect(pipe).toBeTruthy();
  });
});
