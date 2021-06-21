import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListAdminComponent } from './appointment-list-admin.component';

describe('AppointmentListAdminComponent', () => {
  let component: AppointmentListAdminComponent;
  let fixture: ComponentFixture<AppointmentListAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentListAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
