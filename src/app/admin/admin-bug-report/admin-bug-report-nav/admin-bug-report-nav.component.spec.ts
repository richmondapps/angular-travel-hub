import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportNavComponent } from './admin-bug-report-nav.component';

describe('AdminBugReportNavComponent', () => {
  let component: AdminBugReportNavComponent;
  let fixture: ComponentFixture<AdminBugReportNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
