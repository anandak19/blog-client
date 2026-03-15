import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyOneBlog } from './view-my-one-blog';

describe('ViewMyOneBlog', () => {
  let component: ViewMyOneBlog;
  let fixture: ComponentFixture<ViewMyOneBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyOneBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyOneBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
