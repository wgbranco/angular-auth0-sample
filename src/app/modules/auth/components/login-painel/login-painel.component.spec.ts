import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPainelComponent } from './login-painel.component';

describe('LoginPainelComponent', () => {
  let component: LoginPainelComponent;
  let fixture: ComponentFixture<LoginPainelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPainelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPainelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
