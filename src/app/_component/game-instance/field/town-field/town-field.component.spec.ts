import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TownFieldComponent} from './town-field.component';

describe('TownFieldComponent', () => {
  let component: TownFieldComponent;
  let fixture: ComponentFixture<TownFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
