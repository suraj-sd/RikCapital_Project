import { TestBed } from '@angular/core/testing';

import { AccesspagesService } from './accesspages.service';

describe('AccesspagesService', () => {
  let service: AccesspagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccesspagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
