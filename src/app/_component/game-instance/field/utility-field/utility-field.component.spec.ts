import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UtilityFieldComponent} from './utility-field.component';

describe('UtilityFieldComponent', () => {
  let component: UtilityFieldComponent;
  let fixture: ComponentFixture<UtilityFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilityFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilityFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
