import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AuthorizationsListPage } from './authorizations-list.page';
import { TranslateService } from '@ngx-translate/core';

describe('AuthorizationsListPage', () => {
  let component: AuthorizationsListPage;
  let fixture: ComponentFixture<AuthorizationsListPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationsListPage ],
      imports: [IonicModule.forRoot(),TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorizationsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
