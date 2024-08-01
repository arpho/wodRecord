import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProvidersDashboardPage } from './providers-dashboard.page';
import { TranslateService } from '@ngx-translate/core';

describe('ProvidersDashboardPage', () => {
  let component: ProvidersDashboardPage;
  let fixture: ComponentFixture<ProvidersDashboardPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersDashboardPage ],
      imports: [IonicModule.forRoot()],
      providers:[TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProvidersDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
