import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminReservationPage } from './admin-reservation.page';

describe('AdminReservationPage', () => {
  let component: AdminReservationPage;
  let fixture: ComponentFixture<AdminReservationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
