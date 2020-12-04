import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatekeeperManagementComponent } from './gatekeeper-management.component';

describe('GatekeeperManagementComponent', () => {
  let component: GatekeeperManagementComponent;
  let fixture: ComponentFixture<GatekeeperManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatekeeperManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatekeeperManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
