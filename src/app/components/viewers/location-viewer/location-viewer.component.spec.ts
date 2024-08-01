import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationViewerComponent } from './location-viewer.component';
import { LocationModel } from 'src/app/models/locationModel';

describe('LocationViewerComponent', () => {
  let component: LocationViewerComponent;
  let fixture: ComponentFixture<LocationViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationViewerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationViewerComponent);
    component = fixture.componentInstance;
    component.item= new LocationModel({city:"ct",street:"via",zipcode:'',houseNumber:'78',houseNumberSuffix:'b'})
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
