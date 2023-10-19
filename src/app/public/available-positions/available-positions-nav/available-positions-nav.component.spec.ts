import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailablePositionsNavComponent } from './available-positions-nav.component';

describe('AvailablePositionsNavComponent', () => {
  let component: AvailablePositionsNavComponent;
  let fixture: ComponentFixture<AvailablePositionsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailablePositionsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailablePositionsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
