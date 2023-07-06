import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-show.component.html',
  styleUrls: ['./movies-show.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class MoviesShowComponent {
  ngOnInit() {
    console.log(`Show Movie`);
  }
}
