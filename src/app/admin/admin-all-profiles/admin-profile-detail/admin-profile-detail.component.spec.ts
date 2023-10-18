import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfileDetailComponent } from './admin-profile-detail.component';

describe('AdminProfileDetailComponent', () => {
  let component: AdminProfileDetailComponent;
  let fixture: ComponentFixture<AdminProfileDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProfileDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
