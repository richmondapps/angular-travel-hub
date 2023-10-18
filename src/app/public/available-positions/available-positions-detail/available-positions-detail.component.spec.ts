import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePositionsDetailComponent } from './available-positions-detail.component';

describe('AvailablePositionsDetailComponent', () => {
  let component: AvailablePositionsDetailComponent;
  let fixture: ComponentFixture<AvailablePositionsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePositionsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePositionsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
