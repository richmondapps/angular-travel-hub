import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportListComponent } from './admin-bug-report-list.component';

describe('AdminBugReportListComponent', () => {
  let component: AdminBugReportListComponent;
  let fixture: ComponentFixture<AdminBugReportListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
