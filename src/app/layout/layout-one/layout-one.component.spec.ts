import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutOneComponent } from './layout-one.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import packageJson from '../../../../package.json';

describe('LayoutOneComponent', () => {
  let component: LayoutOneComponent;
  let fixture: ComponentFixture<LayoutOneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), RouterTestingModule, LayoutOneComponent],
    });
    fixture = TestBed.createComponent(LayoutOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set appName from package.json', () => {
    expect(component.appName).toBe(packageJson.displayName);
  });

  it('should set title to "Aquino Movies"', () => {
    expect(component.title).toBe('Aquino Movies');
  });
});
