import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DigitalaidPage } from './digitalaid.page';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('DigitalaidPage', () => {
  let component: DigitalaidPage;
  let fixture: ComponentFixture<DigitalaidPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitalaidPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot(),
      HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DigitalaidPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
