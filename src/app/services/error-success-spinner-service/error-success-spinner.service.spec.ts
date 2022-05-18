import { TestBed } from '@angular/core/testing';

import { ErrorSuccessSpinnerService } from './error-success-spinner.service';

describe('ErrorSuccessSpinnerService', () => {
  let service: ErrorSuccessSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorSuccessSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
