import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyBlogs } from './view-my-blogs';

describe('ViewMyBlogs', () => {
  let component: ViewMyBlogs;
  let fixture: ComponentFixture<ViewMyBlogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewMyBlogs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMyBlogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
