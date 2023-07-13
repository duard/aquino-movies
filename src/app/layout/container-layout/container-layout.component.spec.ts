import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLayoutComponent } from './container-layout.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

describe('ContainerLayoutComponent', () => {
  let component: ContainerLayoutComponent;
  let fixture: ComponentFixture<ContainerLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(),
        RouterTestingModule,
        ContainerLayoutComponent,
      ],
    });
    fixture = TestBed.createComponent(ContainerLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
