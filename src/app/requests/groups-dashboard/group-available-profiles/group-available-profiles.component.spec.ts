import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAvailableProfilesComponent } from './group-available-profiles.component';

describe('GroupAvailableProfilesComponent', () => {
  let component: GroupAvailableProfilesComponent;
  let fixture: ComponentFixture<GroupAvailableProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAvailableProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupAvailableProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
