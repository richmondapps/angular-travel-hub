import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePositionsApplyComponent } from './available-positions-apply.component';

describe('AvailablePositionsApplyComponent', () => {
  let component: AvailablePositionsApplyComponent;
  let fixture: ComponentFixture<AvailablePositionsApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePositionsApplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePositionsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
