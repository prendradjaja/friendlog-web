import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphFormatterComponent } from './paragraph-formatter.component';

describe('ParagraphFormatterComponent', () => {
  let component: ParagraphFormatterComponent;
  let fixture: ComponentFixture<ParagraphFormatterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParagraphFormatterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParagraphFormatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
