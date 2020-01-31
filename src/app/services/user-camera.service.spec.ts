import { TestBed } from '@angular/core/testing';

import { UserCameraService } from './user-camera.service';

describe('UserCameraService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserCameraService = TestBed.get(UserCameraService);
    expect(service).toBeTruthy();
  });
});
