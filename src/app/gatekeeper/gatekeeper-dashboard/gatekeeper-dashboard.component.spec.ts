import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatekeeperDashboardComponent } from './gatekeeper-dashboard.component';

describe('GatekeeperDashboardComponent', () => {
  let component: GatekeeperDashboardComponent;
  let fixture: ComponentFixture<GatekeeperDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatekeeperDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatekeeperDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
