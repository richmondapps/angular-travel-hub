import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestCreateComponent } from './admin-feature-request-create.component';

describe('AdminFeatureRequestCreateComponent', () => {
  let component: AdminFeatureRequestCreateComponent;
  let fixture: ComponentFixture<AdminFeatureRequestCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
