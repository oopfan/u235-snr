import { TestBed } from '@angular/core/testing';

import { AtmosphericExtinctionService } from './atmospheric-extinction.service';

describe('AtmosphericExtinctionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtmosphericExtinctionService = TestBed.get(AtmosphericExtinctionService);
    expect(service).toBeTruthy();
  });
});
