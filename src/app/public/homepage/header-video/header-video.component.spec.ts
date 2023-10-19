import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVideoComponent } from './header-video.component';

describe('HeaderVideoComponent', () => {
  let component: HeaderVideoComponent;
  let fixture: ComponentFixture<HeaderVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderVideoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
