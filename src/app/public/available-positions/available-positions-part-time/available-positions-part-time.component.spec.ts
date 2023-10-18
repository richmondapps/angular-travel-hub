import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePositionsPartTimeComponent } from './available-positions-part-time.component';

describe('AvailablePositionsPartTimeComponent', () => {
  let component: AvailablePositionsPartTimeComponent;
  let fixture: ComponentFixture<AvailablePositionsPartTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePositionsPartTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePositionsPartTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
