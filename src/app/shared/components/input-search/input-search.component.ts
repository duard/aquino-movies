import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import Validation from 'src/app/utils/validation';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faSquare,
  faCheckSquare,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InputSearchComponent {
  form: FormGroup = new FormGroup({
    searchField: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    acceptTerms: new FormControl(false),
  });
  submitted = false;

  constructor(library: FaIconLibrary, private formBuilder: FormBuilder) {
    library.addIcons(
      faSquare,
      faCheckSquare,
      faSquare,
      faCheckSquare,
      faSearch
    );
  }
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

    console.log('dados do form', JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }
}
