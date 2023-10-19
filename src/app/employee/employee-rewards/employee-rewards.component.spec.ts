import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeRewardsComponent } from './employee-rewards.component';

describe('EmployeeRewardsComponent', () => {
  let component: EmployeeRewardsComponent;
  let fixture: ComponentFixture<EmployeeRewardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeRewardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeRewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
