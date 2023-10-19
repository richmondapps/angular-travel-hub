import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupDraftListComponent } from './group-draft-list.component';

describe('GroupDraftListComponent', () => {
  let component: GroupDraftListComponent;
  let fixture: ComponentFixture<GroupDraftListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupDraftListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDraftListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
