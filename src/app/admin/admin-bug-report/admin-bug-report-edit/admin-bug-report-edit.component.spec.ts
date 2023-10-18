import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportEditComponent } from './admin-bug-report-edit.component';

describe('AdminBugReportEditComponent', () => {
  let component: AdminBugReportEditComponent;
  let fixture: ComponentFixture<AdminBugReportEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
