import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleChronoComponent } from './article-chrono.component';

describe('ArticleChronoComponent', () => {
  let component: ArticleChronoComponent;
  let fixture: ComponentFixture<ArticleChronoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleChronoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleChronoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
