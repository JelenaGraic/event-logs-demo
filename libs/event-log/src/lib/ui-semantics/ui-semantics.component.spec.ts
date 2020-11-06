import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSemanticsComponent } from './ui-semantics.component';

describe('UiSemanticsComponent', () => {
  let component: UiSemanticsComponent;
  let fixture: ComponentFixture<UiSemanticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UiSemanticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UiSemanticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
