import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { PlantarsPage } from './plantars.page';
import { HttpClientModule } from '@angular/common/http';

describe('PlantarsPage', () => {
  let component: PlantarsPage;
  let fixture: ComponentFixture<PlantarsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlantarsPage ],
      imports: [IonicModule.forRoot(),
        HttpClientModule
      ],
      providers:[{provide:NavParams,useclass:MockNavParams}]
    }).compileComponents();

    fixture = TestBed.createComponent(PlantarsPage);
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
