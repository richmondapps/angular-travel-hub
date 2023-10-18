import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportDetailComponent } from './admin-bug-report-detail.component';

describe('AdminBugReportDetailComponent', () => {
  let component: AdminBugReportDetailComponent;
  let fixture: ComponentFixture<AdminBugReportDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
