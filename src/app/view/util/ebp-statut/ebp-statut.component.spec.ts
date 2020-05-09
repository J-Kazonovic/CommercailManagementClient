import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbpStatutComponent } from './ebp-statut.component';

describe('EbpStatutComponent', () => {
  let component: EbpStatutComponent;
  let fixture: ComponentFixture<EbpStatutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbpStatutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbpStatutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
