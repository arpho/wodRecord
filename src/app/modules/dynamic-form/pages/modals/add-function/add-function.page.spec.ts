import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddFunctionPage } from './add-function.page';
import { TranslateModule } from '@ngx-translate/core';

describe('AddFunctionPage', () => {
  let component: AddFunctionPage;
  let fixture: ComponentFixture<AddFunctionPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFunctionPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddFunctionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
