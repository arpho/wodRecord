import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthorizationViewerComponent } from './authorization-viewer.component';
import { AuthorizationModel } from 'src/app/models/authorizations';

describe('AuthorizationViewerComponent', () => {
  let component: AuthorizationViewerComponent;
  let fixture: ComponentFixture<AuthorizationViewerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationViewerComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationViewerComponent);
    component = fixture.componentInstance;
    component.item = new AuthorizationModel({createTime:new Date().toDateString()})
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
