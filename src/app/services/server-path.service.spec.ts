import { TestBed } from '@angular/core/testing';

import { ServerPathService } from './server-path.service';

describe('ServerPathService', () => {
  let service: ServerPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
