import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSubmit } from './input-submit';

describe('InputSubmit', () => {
  let component: InputSubmit;
  let fixture: ComponentFixture<InputSubmit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSubmit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSubmit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
