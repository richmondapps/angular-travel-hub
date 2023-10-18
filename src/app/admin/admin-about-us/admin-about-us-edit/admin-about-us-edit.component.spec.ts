import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAboutUsEditComponent } from './admin-about-us-edit.component';

describe('AdminAboutUsEditComponent', () => {
  let component: AdminAboutUsEditComponent;
  let fixture: ComponentFixture<AdminAboutUsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAboutUsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAboutUsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
