import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateOrderPage } from './create-order.page';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";


describe('CreatePage in order', () => {
  let component: CreateOrderPage;
  let fixture: ComponentFixture<CreateOrderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderPage ],
      imports: [
        HttpClientTestingModule,
        IonicModule.forRoot(),
      TranslateModule.forRoot(),
      ],
      providers:[
        TranslateService,
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateOrderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create it', () => {
    expect(component).toBeTruthy();
  });
});
