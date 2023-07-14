import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAppointmentPage } from './admin-appointment.page';

describe('AdminAppointmentPage', () => {
  let component: AdminAppointmentPage;
  let fixture: ComponentFixture<AdminAppointmentPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminAppointmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
