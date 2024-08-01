import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { CreatePatientPage } from './create-patient.page';
import { TranslateModule } from '@ngx-translate/core';

describe('CreatePage', () => {
  let component: CreatePatientPage;
  let fixture: ComponentFixture<CreatePatientPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePatientPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot()
      ],
      providers:[TranslateModule,NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(CreatePatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
