import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringEventsListComponent } from './hiring-events-list.component';

describe('HiringEventsListComponent', () => {
  let component: HiringEventsListComponent;
  let fixture: ComponentFixture<HiringEventsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringEventsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringEventsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
