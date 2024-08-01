import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { SleekLoginComponent } from './sleek-login.component';
import { TranslateModule } from '@ngx-translate/core';

describe('SleekLoginComponent', () => {
  let component: SleekLoginComponent;
  let fixture: ComponentFixture<SleekLoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SleekLoginComponent ],
      imports: [
        IonicModule.forRoot(),
      RouterTestingModule,
      ReactiveFormsModule,
      TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SleekLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
