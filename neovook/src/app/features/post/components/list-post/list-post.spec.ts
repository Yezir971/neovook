import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPost } from './list-post';

describe('ListPost', () => {
  let component: ListPost;
  let fixture: ComponentFixture<ListPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPost]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPost);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
