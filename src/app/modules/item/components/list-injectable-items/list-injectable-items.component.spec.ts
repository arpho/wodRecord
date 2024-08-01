import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListInjectableItemsComponent } from './list-injectable-items.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ListInjectableItemsComponent', () => {
  let component: ListInjectableItemsComponent;
  let fixture: ComponentFixture<ListInjectableItemsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListInjectableItemsComponent ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListInjectableItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
