import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPainelComponent } from './signup-painel.component';

describe('SignupPainelComponent', () => {
  let component: SignupPainelComponent;
  let fixture: ComponentFixture<SignupPainelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPainelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
