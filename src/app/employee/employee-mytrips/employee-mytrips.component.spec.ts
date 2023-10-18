import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMytripsComponent } from './employee-mytrips.component';

describe('EmployeeMytripsComponent', () => {
  let component: EmployeeMytripsComponent;
  let fixture: ComponentFixture<EmployeeMytripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeMytripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMytripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
