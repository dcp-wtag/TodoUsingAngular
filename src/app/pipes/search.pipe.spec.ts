import { DisableButtonService } from '../services/disable-button.service';
import { KeywordService } from '../services/keyword.service';
import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  it('create an instance', () => {
    const pipe = new SearchPipe(
      new KeywordService(),
      new DisableButtonService()
    );
    expect(pipe).toBeTruthy();
  });
});
