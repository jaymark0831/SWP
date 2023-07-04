import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuloginPage } from './menulogin.page';

describe('MenuloginPage', () => {
  let component: MenuloginPage;
  let fixture: ComponentFixture<MenuloginPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuloginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
