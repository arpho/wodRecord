import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { UpdateCustomerPage } from './update-customer.page';
import { translate } from '@ngneat/transloco';
import { TranslateModule } from '@ngx-translate/core';

class MockNavParams {
  data = {
  };

  get(param) {
    return this.data[param];
  }
}

describe('UpdateCustomerPage', () => {
  let component: UpdateCustomerPage;
  let fixture: ComponentFixture<UpdateCustomerPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateCustomerPage],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot(),
      ],
      providers: [{ provide: NavParams, useClass: MockNavParams },]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateCustomerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
