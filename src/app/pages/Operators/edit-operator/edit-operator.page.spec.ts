import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavParams } from '@ionic/angular';

import { EditOPeratorPage } from './edit-operator.page';

describe('EditOPeratorPage', () => {
  let component: EditOPeratorPage;
  let fixture: ComponentFixture<EditOPeratorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOPeratorPage ],
      imports: [IonicModule.forRoot(),NavParams]
    }).compileComponents();

    fixture = TestBed.createComponent(EditOPeratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
