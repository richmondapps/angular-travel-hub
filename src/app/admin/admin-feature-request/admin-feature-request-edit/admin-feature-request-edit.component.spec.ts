import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestEditComponent } from './admin-feature-request-edit.component';

describe('AdminFeatureRequestEditComponent', () => {
  let component: AdminFeatureRequestEditComponent;
  let fixture: ComponentFixture<AdminFeatureRequestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
