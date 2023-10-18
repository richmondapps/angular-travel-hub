import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSubmittedListComponent } from './group-submitted-list.component';

describe('GroupSubmittedListComponent', () => {
  let component: GroupSubmittedListComponent;
  let fixture: ComponentFixture<GroupSubmittedListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupSubmittedListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSubmittedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
