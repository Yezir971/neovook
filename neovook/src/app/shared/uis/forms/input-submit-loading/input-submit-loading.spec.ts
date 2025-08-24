import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSubmitLoading } from './input-submit-loading';

describe('InputSubmitLoading', () => {
  let component: InputSubmitLoading;
  let fixture: ComponentFixture<InputSubmitLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSubmitLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputSubmitLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
