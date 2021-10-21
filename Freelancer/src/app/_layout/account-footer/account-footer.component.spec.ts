import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFooterComponent } from './account-footer.component';

describe('AccountFooterComponent', () => {
  let component: AccountFooterComponent;
  let fixture: ComponentFixture<AccountFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
