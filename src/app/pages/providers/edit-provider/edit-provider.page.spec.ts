import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { EditProviderPage } from './edit-provider.page';
import { TranslateModule } from '@ngx-translate/core';
import { ProvidersModel } from 'src/app/models/providersModel';

describe('EditProviderPage', () => {
  let component: EditProviderPage;
  let fixture: ComponentFixture<EditProviderPage>;
   const NavParamsMock = {
    data:{data:new ProvidersModel({key:'qwertyui',denominazione:'poiuytr',locations:[],patients:[],groups:[],orders:[]})}
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProviderPage ],
      imports: [IonicModule.forRoot(),
      TranslateModule.forRoot()
      ],
      providers:[
      
          {provide: NavParams, useClass: NavParamsMock},
        ]
      
    }).compileComponents();

    fixture = TestBed.createComponent(EditProviderPage);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
