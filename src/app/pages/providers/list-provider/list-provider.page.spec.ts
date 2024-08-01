import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListProviderPage } from './list-provider.page';
import { TranslateModule } from '@ngx-translate/core';

describe('ListProviderPage', () => {
  let component: ListProviderPage;
  let fixture: ComponentFixture<ListProviderPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProviderPage ],
      imports: [
        IonicModule.forRoot(),
      TranslateModule.forRoot(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
