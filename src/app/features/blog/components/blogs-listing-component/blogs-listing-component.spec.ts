import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogsListingComponent } from './blogs-listing-component';

describe('BlogsListingComponent', () => {
  let component: BlogsListingComponent;
  let fixture: ComponentFixture<BlogsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogsListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogsListingComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
