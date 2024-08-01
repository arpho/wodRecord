import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GridInjectableItemsComponent } from './grid-injectable-items.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { AuthorizationsService } from 'src/app/services/autorizations/authorizations.service';

describe('GridInjectableItemsComponent', () => {
  let component: GridInjectableItemsComponent;
  let fixture: ComponentFixture<GridInjectableItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GridInjectableItemsComponent ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot()
    ]
    }).compileComponents();

    fixture = TestBed.createComponent(GridInjectableItemsComponent);
    component = fixture.componentInstance;
    component.service = new AuthorizationsService()
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
