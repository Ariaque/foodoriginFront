import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessPagecomponent } from './success-pagecomponent';

describe('EmailSendingConfirmationComponent', () => {
  let component: SuccessPagecomponent;
  let fixture: ComponentFixture<SuccessPagecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessPagecomponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessPagecomponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
