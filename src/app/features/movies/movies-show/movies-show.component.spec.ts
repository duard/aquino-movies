import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesShowComponent } from './movies-show.component';
import { MoviesFacade } from '@store/movies';
import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

describe('MoviesShowComponent', () => {
  let component: MoviesShowComponent;
  let fixture: ComponentFixture<MoviesShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(),
        RouterTestingModule,
        MoviesShowComponent,
      ],
      providers: [MoviesFacade],
    });
    fixture = TestBed.createComponent(MoviesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
