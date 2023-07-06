import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ContainerLayoutComponent } from './layout/container-layout/container-layout.component';
import { NavbarComponent } from './layout/components/navbar/navbar/navbar.component';
import { HeaderComponent } from './layout/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    CommonModule,
    RouterOutlet,
    ContainerLayoutComponent,
    NavbarComponent,
    HeaderComponent,
  ],
})
export class AppComponent {}
