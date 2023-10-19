import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicDepartmentsNavComponent } from './public-departments-nav.component';

describe('PublicDepartmentsNavComponent', () => {
  let component: PublicDepartmentsNavComponent;
  let fixture: ComponentFixture<PublicDepartmentsNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicDepartmentsNavComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicDepartmentsNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
