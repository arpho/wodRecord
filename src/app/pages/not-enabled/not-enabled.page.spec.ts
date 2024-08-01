import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { NotEnabledPage } from './not-enabled.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

describe('NotEnabledPage', () => {
  let component: NotEnabledPage;
  let fixture: ComponentFixture<NotEnabledPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NotEnabledPage ],
      imports: [
        IonicModule.forRoot(),
        TranslateModule.forRoot()

      ],
      providers:[NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(NotEnabledPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
