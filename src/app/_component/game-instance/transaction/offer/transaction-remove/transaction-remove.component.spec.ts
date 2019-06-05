import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRemoveComponent } from './transaction-remove.component';

describe('TransactionRemoveComponent', () => {
  let component: TransactionRemoveComponent;
  let fixture: ComponentFixture<TransactionRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
