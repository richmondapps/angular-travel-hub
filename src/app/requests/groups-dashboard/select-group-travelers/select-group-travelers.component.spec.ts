import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGroupTravelersComponent } from './select-group-travelers.component';

describe('SelectGroupTravelersComponent', () => {
  let component: SelectGroupTravelersComponent;
  let fixture: ComponentFixture<SelectGroupTravelersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectGroupTravelersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectGroupTravelersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
