import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongResponseFormatterComponent } from './long-response-formatter.component';

describe('LongResponseFormatterComponent', () => {
  let component: LongResponseFormatterComponent;
  let fixture: ComponentFixture<LongResponseFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LongResponseFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongResponseFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
