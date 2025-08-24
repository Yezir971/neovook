import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputTitle } from './input-title';

describe('InputTitle', () => {
  let component: InputTitle;
  let fixture: ComponentFixture<InputTitle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTitle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputTitle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
