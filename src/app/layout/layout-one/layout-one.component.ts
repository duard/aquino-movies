import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { LogoComponent } from '../components/logo/logo.component';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';

@Component({
  selector: 'app-layout-one',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss'],
})
export class LayoutOneComponent {}
