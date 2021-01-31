import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductwisetermComponent } from './productwiseterm.component';

describe('ProductwisetermComponent', () => {
  let component: ProductwisetermComponent;
  let fixture: ComponentFixture<ProductwisetermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductwisetermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductwisetermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
