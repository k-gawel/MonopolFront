import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TownInfoComponent} from './town-info.component';

describe('TownInfoComponent', () => {
  let component: TownInfoComponent;
  let fixture: ComponentFixture<TownInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TownInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TownInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
