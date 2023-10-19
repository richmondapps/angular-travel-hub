import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberGuardCardComponent } from './member-guard-card.component';

describe('MemberGuardCardComponent', () => {
  let component: MemberGuardCardComponent;
  let fixture: ComponentFixture<MemberGuardCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberGuardCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberGuardCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
