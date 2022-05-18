import { TestBed } from '@angular/core/testing';

import { DisableButtonService } from './disable-button.service';

describe('DisableButtonService', () => {
  let service: DisableButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisableButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
