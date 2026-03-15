import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOneBlog } from './view-one-blog';

describe('ViewOneBlog', () => {
  let component: ViewOneBlog;
  let fixture: ComponentFixture<ViewOneBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOneBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewOneBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
