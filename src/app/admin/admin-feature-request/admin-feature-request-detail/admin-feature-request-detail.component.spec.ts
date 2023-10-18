import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestDetailComponent } from './admin-feature-request-detail.component';

describe('AdminFeatureRequestDetailComponent', () => {
  let component: AdminFeatureRequestDetailComponent;
  let fixture: ComponentFixture<AdminFeatureRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
