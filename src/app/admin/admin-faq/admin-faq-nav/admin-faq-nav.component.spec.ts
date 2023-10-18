import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaqNavComponent } from './admin-faq-nav.component';

describe('AdminFaqNavComponent', () => {
  let component: AdminFaqNavComponent;
  let fixture: ComponentFixture<AdminFaqNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFaqNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFaqNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
