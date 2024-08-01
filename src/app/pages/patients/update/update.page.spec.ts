import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { UpdatePatientPage } from './update.page';

describe('UpdatePage', () => {
  let component: UpdatePatientPage;
  let fixture: ComponentFixture<UpdatePatientPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePatientPage ],
      imports: [IonicModule.forRoot()],
      providers:[NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdatePatientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
