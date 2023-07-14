import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAccountsPage } from './admin-accounts.page';

describe('AdminAccountsPage', () => {
  let component: AdminAccountsPage;
  let fixture: ComponentFixture<AdminAccountsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminAccountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
