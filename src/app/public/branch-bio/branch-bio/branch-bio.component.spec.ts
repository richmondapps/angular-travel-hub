import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBioComponent } from './branch-bio.component';

describe('BranchBioComponent', () => {
  let component: BranchBioComponent;
  let fixture: ComponentFixture<BranchBioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchBioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchBioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
