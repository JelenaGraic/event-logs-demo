import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiDevicesComponent } from './ui-devices.component';

describe('UiDevicesComponent', () => {
  let component: UiDevicesComponent;
  let fixture: ComponentFixture<UiDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiDevicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
