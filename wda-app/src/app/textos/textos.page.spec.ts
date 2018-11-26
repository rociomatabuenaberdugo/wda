import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextosPage } from './textos.page';

describe('TextosPage', () => {
  let component: TextosPage;
  let fixture: ComponentFixture<TextosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
