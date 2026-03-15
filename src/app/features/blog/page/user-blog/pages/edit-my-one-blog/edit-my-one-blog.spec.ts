import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyOneBlog } from './edit-my-one-blog';

describe('EditMyOneBlog', () => {
  let component: EditMyOneBlog;
  let fixture: ComponentFixture<EditMyOneBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditMyOneBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditMyOneBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
