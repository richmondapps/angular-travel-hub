import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutUsDetailComponent } from './admin-about-us-detail.component';

describe('AdminAboutUsDetailComponent', () => {
  let component: AdminAboutUsDetailComponent;
  let fixture: ComponentFixture<AdminAboutUsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAboutUsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutUsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
