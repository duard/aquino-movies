import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MoviesListComponent } from './movies-list.component';
import { HttpClientModule } from '@angular/common/http';
import { from } from 'rxjs';
import { MoviesFacade } from '@store/movies';
import { StoreModule } from '@ngrx/store';

describe('MoviesListComponent', () => {
  let component: MoviesListComponent;
  let fixture: ComponentFixture<MoviesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MoviesListComponent,
        HttpClientModule,
        RouterTestingModule,
        StoreModule.forRoot(),
      ],
      providers: [MoviesFacade],
    });
    fixture = TestBed.createComponent(MoviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
