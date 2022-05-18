import { TestBed } from '@angular/core/testing';

import { AddTaskUiService } from './add-task-ui.service';

describe('AddTaskUiService', () => {
  let service: AddTaskUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
