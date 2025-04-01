import { TestBed } from '@angular/core/testing';

import { UploadReportsService } from './upload-reports.service';

describe('UploadReportsService', () => {
  let service: UploadReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
