import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBioComponent } from './member-bio.component';

describe('MemberBioComponent', () => {
  let component: MemberBioComponent;
  let fixture: ComponentFixture<MemberBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
