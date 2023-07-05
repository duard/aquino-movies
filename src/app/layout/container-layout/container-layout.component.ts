import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../components/logo/logo.component';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-container-layout',
  standalone: true,
  templateUrl: './container-layout.component.html',
  styleUrls: ['./container-layout.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    LogoComponent,
    NavbarComponent,
    FooterComponent,
  ],
})
export class ContainerLayoutComponent {}
