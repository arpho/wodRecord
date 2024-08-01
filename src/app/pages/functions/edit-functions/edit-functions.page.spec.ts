import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { EditFunctionsPage } from './edit-functions.page';
import { TranslateModule } from '@ngx-translate/core';

describe('EditFunctionsPage', () => {
  let component: EditFunctionsPage;
  let fixture: ComponentFixture<EditFunctionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFunctionsPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot()
      ],
      providers:[NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(EditFunctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
