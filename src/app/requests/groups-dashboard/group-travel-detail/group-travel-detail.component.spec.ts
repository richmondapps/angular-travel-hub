import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTravelDetailComponent } from './group-travel-detail.component';

describe('GroupTravelDetailComponent', () => {
  let component: GroupTravelDetailComponent;
  let fixture: ComponentFixture<GroupTravelDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTravelDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTravelDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
