import { Component, Input, ViewEncapsulation, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms';

import { MoviesFacade } from '@store/movies';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  @Input() pageNum: number = 1;
  @Input() searchValue: string = '';
  private readonly moviesFacade: MoviesFacade = inject(MoviesFacade);
  isLoading$: Observable<boolean> = this.moviesFacade.isLoading$;

  form: FormGroup = new FormGroup({
    searchField: new FormControl(''),
  });

  submitted = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchField: ['', Validators.required],
    });
    console.log('SEARCH COMPONENTE', this.searchValue);

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('QUERY PARAMAS', params);
      this.pageNum = params['pageNum'];
      this.searchValue = params['searchValue'];
      if (this.searchValue) {
        this.form.setValue({
          searchField: this.searchValue,
        });
      }
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
    console.log('try to reset');

    this.submitted = false;
    this.form.updateValueAndValidity();
    this.form.reset();

    this.form.reset();
    // this.form.controls.searchField.setErrors(null);
  }

  submitForm(formData: any, formDirective: FormGroupDirective): void {
    this.form.updateValueAndValidity();
    formDirective.resetForm();
    this.form.reset();
  }

  ngOnDestroy() {
    // implementar o destroy
    // problema de child routes como ilustrado aqui
    // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    // this.onDestroy.next();
    // this.onDestroy.complete();
    console.log('destruido');

    // this.subscription.unsubscribe();
  }
}
