import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSendingConfirmationComponent } from './email-sending-confirmation.component';

describe('EmailSendingConfirmationComponent', () => {
  let component: EmailSendingConfirmationComponent;
  let fixture: ComponentFixture<EmailSendingConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSendingConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSendingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
