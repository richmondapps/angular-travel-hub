import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRentalComponent } from './return-rental.component';

describe('ReturnRentalComponent', () => {
  let component: ReturnRentalComponent;
  let fixture: ComponentFixture<ReturnRentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnRentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
