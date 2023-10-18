import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFeatureRequestListComponent } from './admin-feature-request-list.component';

describe('AdminFeatureRequestListComponent', () => {
  let component: AdminFeatureRequestListComponent;
  let fixture: ComponentFixture<AdminFeatureRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFeatureRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminFeatureRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
