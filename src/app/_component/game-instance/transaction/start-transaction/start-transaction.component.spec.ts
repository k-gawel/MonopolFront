import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartTransactionComponent } from './start-transaction.component';

describe('StartTransactionComponent', () => {
  let component: StartTransactionComponent;
  let fixture: ComponentFixture<StartTransactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartTransactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
