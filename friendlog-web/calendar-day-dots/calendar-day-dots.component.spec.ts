import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDayDotsComponent } from './calendar-day-dots.component';

describe('CalendarDayDotsComponent', () => {
  let component: CalendarDayDotsComponent;
  let fixture: ComponentFixture<CalendarDayDotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarDayDotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDayDotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
