import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../components/footer/footer.component';
import { NavbarComponent } from '../components/navbar/navbar/navbar.component';
import { HeaderComponent } from '../components/header/header.component';
import packageJson from '../../../../package.json';

@Component({
  selector: 'app-layout-one',
  standalone: true,
  templateUrl: './layout-one.component.html',
  styleUrls: ['./layout-one.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,

  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
  ],
})
export class LayoutOneComponent {
  appName: any = packageJson.displayName;

  title = 'Aquino Movies';
}
