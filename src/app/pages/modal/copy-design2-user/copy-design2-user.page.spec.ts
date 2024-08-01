import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { CopyDesign2UserPage } from './copy-design2-user.page';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

describe('CopyDesign2UserPage', () => {
  let component: CopyDesign2UserPage;
  let fixture: ComponentFixture<CopyDesign2UserPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CopyDesign2UserPage ],
      imports: [IonicModule.forRoot(),
        HttpClientModule
      ],
      providers:[{provide:NavParams,useclass:MockNavParams},TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(CopyDesign2UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class MockNavParams{
  data = {
  };

  get(param){
    return this.data[param];
  }
}

