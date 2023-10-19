import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestNavComponent } from './admin-feature-request-nav.component';

describe('AdminFeatureRequestNavComponent', () => {
  let component: AdminFeatureRequestNavComponent;
  let fixture: ComponentFixture<AdminFeatureRequestNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
