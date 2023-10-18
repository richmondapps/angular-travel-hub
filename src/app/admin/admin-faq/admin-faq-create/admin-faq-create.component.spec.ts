import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFaqCreateComponent } from './admin-faq-create.component';

describe('AdminFaqCreateComponent', () => {
  let component: AdminFaqCreateComponent;
  let fixture: ComponentFixture<AdminFaqCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFaqCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFaqCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
