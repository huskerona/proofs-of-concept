import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GatekeeperListComponent } from './gatekeeper-list.component';

describe('GatekeeperListComponent', () => {
  let component: GatekeeperListComponent;
  let fixture: ComponentFixture<GatekeeperListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GatekeeperListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GatekeeperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
