import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalCardComponent } from './global-card.component';

describe('GlobalCardComponent', () => {
  let component: GlobalCardComponent;
  let fixture: ComponentFixture<GlobalCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
