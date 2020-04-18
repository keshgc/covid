import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KGridComponent } from './k-grid.component';

describe('KGridComponent', () => {
  let component: KGridComponent;
  let fixture: ComponentFixture<KGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
