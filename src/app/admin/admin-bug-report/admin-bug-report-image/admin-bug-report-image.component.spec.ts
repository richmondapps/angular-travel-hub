import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBugReportImageComponent } from './admin-bug-report-image.component';

describe('AdminBugReportImageComponent', () => {
  let component: AdminBugReportImageComponent;
  let fixture: ComponentFixture<AdminBugReportImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBugReportImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBugReportImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
