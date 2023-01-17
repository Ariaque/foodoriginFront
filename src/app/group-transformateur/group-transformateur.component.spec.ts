import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupTransformateurComponent } from './group-transformateur.component';

describe('GroupTransformateurComponent', () => {
  let component: GroupTransformateurComponent;
  let fixture: ComponentFixture<GroupTransformateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupTransformateurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupTransformateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
