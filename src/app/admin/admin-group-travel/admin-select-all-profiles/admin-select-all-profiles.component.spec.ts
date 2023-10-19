import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSelectAllProfilesComponent } from './admin-select-all-profiles.component';

describe('AdminSelectAllProfilesComponent', () => {
  let component: AdminSelectAllProfilesComponent;
  let fixture: ComponentFixture<AdminSelectAllProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSelectAllProfilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSelectAllProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
