import { TestBed } from '@angular/core/testing';

import { QuickStartGuard } from './quick-start-guard';

describe('QuickStartGuard', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuickStartGuard = TestBed.get(QuickStartGuard);
    expect(service).toBeTruthy();
  });
});
