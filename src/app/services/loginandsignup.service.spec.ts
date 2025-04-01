import { TestBed } from '@angular/core/testing';

import { LoginandsignupService } from './loginandsignup.service';

describe('LoginandsignupService', () => {
  let service: LoginandsignupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginandsignupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
