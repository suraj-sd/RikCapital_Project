import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadReportsComponent } from './upload-reports.component';

describe('UploadReportsComponent', () => {
  let component: UploadReportsComponent;
  let fixture: ComponentFixture<UploadReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
