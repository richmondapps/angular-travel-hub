import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailLinkSentComponent } from './email-link-sent.component';

describe('EmailLinkSentComponent', () => {
  let component: EmailLinkSentComponent;
  let fixture: ComponentFixture<EmailLinkSentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailLinkSentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLinkSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
