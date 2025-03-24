import { TestBed } from '@angular/core/testing';

import { BulkdataService } from './bulkdata.service';

describe('BulkdataService', () => {
  let service: BulkdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BulkdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
