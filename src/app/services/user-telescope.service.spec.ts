import { TestBed } from '@angular/core/testing';

import { UserTelescopeService } from './user-telescope.service';

describe('UserTelescopesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserTelescopeService = TestBed.get(UserTelescopeService);
    expect(service).toBeTruthy();
  });
});
