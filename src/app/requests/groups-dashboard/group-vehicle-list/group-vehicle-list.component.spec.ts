import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupVehicleListComponent } from './group-vehicle-list.component';

describe('GroupVehicleListComponent', () => {
  let component: GroupVehicleListComponent;
  let fixture: ComponentFixture<GroupVehicleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupVehicleListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupVehicleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
