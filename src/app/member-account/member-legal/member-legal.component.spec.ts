import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberLegalComponent } from './member-legal.component';

describe('MemberLegalComponent', () => {
  let component: MemberLegalComponent;
  let fixture: ComponentFixture<MemberLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberLegalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
