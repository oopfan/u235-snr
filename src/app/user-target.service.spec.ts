import { TestBed } from '@angular/core/testing';

import { UserTargetService } from './user-target.service';

describe('UserTargetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTargetService = TestBed.get(UserTargetService);
    expect(service).toBeTruthy();
  });
});
