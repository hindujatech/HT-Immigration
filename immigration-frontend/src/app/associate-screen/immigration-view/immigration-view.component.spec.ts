import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmigrationViewComponent } from './immigration-view.component';

describe('ImmigrationViewComponent', () => {
  let component: ImmigrationViewComponent;
  let fixture: ComponentFixture<ImmigrationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImmigrationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImmigrationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
