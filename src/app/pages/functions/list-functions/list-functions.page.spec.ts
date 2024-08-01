import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListFunctionsPage } from './list-functions.page';
import { TranslateModule } from '@ngx-translate/core';

describe('ListFunctionsPage', () => {
  let component: ListFunctionsPage;
  let fixture: ComponentFixture<ListFunctionsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFunctionsPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListFunctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
