import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBlogDetails } from './show-blog-details';

describe('ShowBlogDetails', () => {
  let component: ShowBlogDetails;
  let fixture: ComponentFixture<ShowBlogDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowBlogDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowBlogDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
