import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { EditPatientPage } from './edit-patient.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('EditPatientPage', () => {
  let component: EditPatientPage;
  let fixture: ComponentFixture<EditPatientPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPatientPage ],
      imports: [IonicModule.forRoot(),
      TranslateModule.forRoot()
      ],
      providers:[NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(EditPatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
