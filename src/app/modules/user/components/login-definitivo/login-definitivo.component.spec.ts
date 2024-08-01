import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { LoginDefinitivoComponent } from './login-definitivo.component';

describe('LoginDefinitivoComponent', () => {
  let component: LoginDefinitivoComponent;
  let fixture: ComponentFixture<LoginDefinitivoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginDefinitivoComponent ],
      imports: [IonicModule.forRoot(),
      RouterTestingModule,
    ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginDefinitivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
