import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddOperatorPage } from './add-operator.page';
import { TranslateService } from '@ngx-translate/core';

describe('AddOperatorPage', () => {
  let component: AddOperatorPage;
  let fixture: ComponentFixture<AddOperatorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperatorPage ],
      imports: [IonicModule.forRoot(),TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(AddOperatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
