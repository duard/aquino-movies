import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  inject,
} from '@angular/core';
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

  @ViewChild('fieldToSearch', { static: false })
  fieldToSearch: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      searchField: ['', Validators.required],
    });

    this.activatedRoute.queryParams.subscribe((params) => {
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

    this.moviesFacade.searchMovie(1, this.form.value.searchField);
  }

  onReset(formData: any, formDirective: FormGroupDirective): void {
    this.submitted = false;
    this.form.updateValueAndValidity();
    formDirective.resetForm();
    this.form.reset();
    this.fieldToSearch.nativeElement.focus();
  }

  ngOnDestroy() {
    // implementar o destroy
    // problema de child routes como ilustrado aqui
    // https://medium.com/angular-in-depth/refresh-current-route-in-angular-512a19d58f6e
    // this.onDestroy.next();
    // this.onDestroy.complete();
    // console.log('destruido');
    // this.subscription.unsubscribe();
  }
}
