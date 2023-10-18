import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPersonalDetailsComponent } from './member-personal-details.component';

describe('MemberPersonalDetailsComponent', () => {
  let component: MemberPersonalDetailsComponent;
  let fixture: ComponentFixture<MemberPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPersonalDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
