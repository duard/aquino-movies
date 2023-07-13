import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTwoComponent } from './layout-two.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import packageJson from '../../../../package.json';

describe('LayoutTwoComponent', () => {
  let component: LayoutTwoComponent;
  let fixture: ComponentFixture<LayoutTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(), RouterTestingModule, LayoutTwoComponent],
    });
    fixture = TestBed.createComponent(LayoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should set appName from package.json', () => {
    expect(component.appName).toBe(packageJson.displayName);
  });

  it('should set title to "Aquino Movies"', () => {
    expect(component.title).toBe('Aquino Movies');
  });
});
