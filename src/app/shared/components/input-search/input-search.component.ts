import { Component, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';

import { MoviesFacade } from '@store/movies';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;

  form: FormGroup = new FormGroup({
    searchField: new FormControl(''),
  });

  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchField: ['', Validators.required],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }
    const searchValue = this.form.value.searchField;

    this.router.navigate(['/movies'], {
      queryParams: { searchValue: searchValue, pageNum: 1 },
    });
    console.log('form busca', searchValue, 'pageNum', 1);
    this.moviesFacade.searchMovie(1, this.form.value.searchField);
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
