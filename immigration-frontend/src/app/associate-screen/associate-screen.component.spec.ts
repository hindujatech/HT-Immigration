import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateScreenComponent } from './associate-screen.component';

describe('AssociateScreenComponent', () => {
  let component: AssociateScreenComponent;
  let fixture: ComponentFixture<AssociateScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
