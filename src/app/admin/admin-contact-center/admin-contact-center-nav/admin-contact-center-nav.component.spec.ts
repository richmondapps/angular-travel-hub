import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminContactCenterNavComponent } from './admin-contact-center-nav.component';

describe('AdminContactCenterNavComponent', () => {
  let component: AdminContactCenterNavComponent;
  let fixture: ComponentFixture<AdminContactCenterNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminContactCenterNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminContactCenterNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
