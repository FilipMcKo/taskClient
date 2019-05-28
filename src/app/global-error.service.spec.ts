import { TestBed } from '@angular/core/testing';

import { GlobalErrorService } from './global-error.service';

describe('GlobalErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GlobalErrorService = TestBed.get(GlobalErrorService);
    expect(service).toBeTruthy();
  });
});
