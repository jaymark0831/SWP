import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAnnouncementPage } from './admin-announcement.page';

describe('AdminAnnouncementPage', () => {
  let component: AdminAnnouncementPage;
  let fixture: ComponentFixture<AdminAnnouncementPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdminAnnouncementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
