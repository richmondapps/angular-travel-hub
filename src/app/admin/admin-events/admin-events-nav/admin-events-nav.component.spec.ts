import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEventsNavComponent } from './admin-events-nav.component';

describe('AdminEventsNavComponent', () => {
  let component: AdminEventsNavComponent;
  let fixture: ComponentFixture<AdminEventsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEventsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEventsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
