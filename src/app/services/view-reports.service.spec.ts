import { TestBed } from '@angular/core/testing';

import { ViewReportsService } from './view-reports.service';

describe('ViewReportsService', () => {
  let service: ViewReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
