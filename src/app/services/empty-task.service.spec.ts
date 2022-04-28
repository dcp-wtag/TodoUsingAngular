import { TestBed } from '@angular/core/testing';

import { EmptyTaskService } from './empty-task.service';

describe('EmptyTaskService', () => {
  let service: EmptyTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmptyTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
