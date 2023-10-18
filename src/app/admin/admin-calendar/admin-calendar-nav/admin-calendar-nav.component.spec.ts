import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarNavComponent } from './admin-calendar-nav.component';

describe('AdminCalendarNavComponent', () => {
  let component: AdminCalendarNavComponent;
  let fixture: ComponentFixture<AdminCalendarNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCalendarNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCalendarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
