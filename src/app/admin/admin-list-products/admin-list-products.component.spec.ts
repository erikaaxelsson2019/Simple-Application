import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListProductsComponent } from './admin-list-products.component';

describe('AdminListProductsComponent', () => {
  let component: AdminListProductsComponent;
  let fixture: ComponentFixture<AdminListProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminListProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
