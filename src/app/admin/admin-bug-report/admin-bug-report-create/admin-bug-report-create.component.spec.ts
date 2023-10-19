import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportCreateComponent } from './admin-bug-report-create.component';

describe('AdminBugReportCreateComponent', () => {
  let component: AdminBugReportCreateComponent;
  let fixture: ComponentFixture<AdminBugReportCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
