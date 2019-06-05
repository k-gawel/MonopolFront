import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CardGroupInfoComponent} from './card-group-info.component';

describe('CardGroupInfoComponent', () => {
  let component: CardGroupInfoComponent;
  let fixture: ComponentFixture<CardGroupInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardGroupInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardGroupInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
