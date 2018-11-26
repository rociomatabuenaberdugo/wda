import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraPage } from './muestra.page';

describe('MuestraPage', () => {
  let component: MuestraPage;
  let fixture: ComponentFixture<MuestraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
