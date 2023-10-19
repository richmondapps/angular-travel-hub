import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsDetailComponent } from './admin-events-detail.component';

describe('AdminEventsDetailComponent', () => {
  let component: AdminEventsDetailComponent;
  let fixture: ComponentFixture<AdminEventsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
