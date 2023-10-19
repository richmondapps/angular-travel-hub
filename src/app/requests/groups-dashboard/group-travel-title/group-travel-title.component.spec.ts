import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTravelTitleComponent } from './group-travel-title.component';

describe('GroupTravelTitleComponent', () => {
  let component: GroupTravelTitleComponent;
  let fixture: ComponentFixture<GroupTravelTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTravelTitleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTravelTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
