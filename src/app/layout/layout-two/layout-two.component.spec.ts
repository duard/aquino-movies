import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutTwoComponent } from './layout-two.component';

describe('LayoutTwoComponent', () => {
  let component: LayoutTwoComponent;
  let fixture: ComponentFixture<LayoutTwoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LayoutTwoComponent]
    });
    fixture = TestBed.createComponent(LayoutTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
