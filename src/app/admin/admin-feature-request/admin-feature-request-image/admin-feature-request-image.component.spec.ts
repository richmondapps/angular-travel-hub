import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestImageComponent } from './admin-feature-request-image.component';

describe('AdminFeatureRequestImageComponent', () => {
  let component: AdminFeatureRequestImageComponent;
  let fixture: ComponentFixture<AdminFeatureRequestImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
