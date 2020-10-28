import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiEventsFilterComponent } from './ui-events-filter.component';

describe('UiEventsFilterComponent', () => {
  let component: UiEventsFilterComponent;
  let fixture: ComponentFixture<UiEventsFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiEventsFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiEventsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
