import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberProfileDeleteComponent } from './member-profile-delete.component';

describe('MemberProfileDeleteComponent', () => {
  let component: MemberProfileDeleteComponent;
  let fixture: ComponentFixture<MemberProfileDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberProfileDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberProfileDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
