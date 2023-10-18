import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePositionsFullTimeComponent } from './available-positions-full-time.component';

describe('AvailablePositionsFullTimeComponent', () => {
  let component: AvailablePositionsFullTimeComponent;
  let fixture: ComponentFixture<AvailablePositionsFullTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePositionsFullTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePositionsFullTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
