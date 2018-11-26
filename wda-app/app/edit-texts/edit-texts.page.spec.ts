import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTextsPage } from './edit-texts.page';

describe('EditTextsPage', () => {
  let component: EditTextsPage;
  let fixture: ComponentFixture<EditTextsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTextsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTextsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
