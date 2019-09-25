import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularBootstrapCheckboxGroupComponent } from './angular-bootstrap-checkbox-group.component';

describe('AngularBootstrapCheckboxGroupComponent', () => {
  let component: AngularBootstrapCheckboxGroupComponent;
  let fixture: ComponentFixture<AngularBootstrapCheckboxGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AngularBootstrapCheckboxGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularBootstrapCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
