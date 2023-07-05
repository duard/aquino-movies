import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../components/logo/logo.component';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-two',
  standalone: true,
  templateUrl: './layout-two.component.html',
  styleUrls: ['./layout-two.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    NavbarComponent,
    FooterComponent,
  ],
})
export class LayoutTwoComponent {}
