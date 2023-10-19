import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPersonalResumeComponent } from './member-personal-resume.component';

describe('MemberPersonalResumeComponent', () => {
  let component: MemberPersonalResumeComponent;
  let fixture: ComponentFixture<MemberPersonalResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberPersonalResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPersonalResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
