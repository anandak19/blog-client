import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewBlog } from './preview-blog';

describe('PreviewBlog', () => {
  let component: PreviewBlog;
  let fixture: ComponentFixture<PreviewBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewBlog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
