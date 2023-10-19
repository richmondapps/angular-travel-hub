import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinBoardDetailComponent } from './bulletin-board-detail.component';

describe('BulletinBoardDetailComponent', () => {
  let component: BulletinBoardDetailComponent;
  let fixture: ComponentFixture<BulletinBoardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulletinBoardDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinBoardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
