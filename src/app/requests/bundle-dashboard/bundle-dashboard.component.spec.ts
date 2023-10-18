import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BundleDashboardComponent } from './bundle-dashboard.component';

describe('BundleDashboardComponent', () => {
  let component: BundleDashboardComponent;
  let fixture: ComponentFixture<BundleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BundleDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BundleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
