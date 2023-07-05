import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowComponent } from './movies-show.component';

describe('MoviesShowComponent', () => {
  let component: MoviesShowComponent;
  let fixture: ComponentFixture<MoviesShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MoviesShowComponent]
    });
    fixture = TestBed.createComponent(MoviesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
