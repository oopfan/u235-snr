import { TestBed } from '@angular/core/testing';

import { UserObservatoryService } from './user-observatory.service';

describe('UserObservatoriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserObservatoryService = TestBed.get(UserObservatoryService);
    expect(service).toBeTruthy();
  });
});
