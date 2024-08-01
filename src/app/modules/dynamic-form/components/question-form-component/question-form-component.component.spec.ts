import {  ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { QuestionFormComponent } from './question-form-component.component';
import { UntypedFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ItemModule } from 'src/app/modules/item/item.module';
import { TranslateModule } from '@ngx-translate/core';

describe('QuestionFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionFormComponent],
      imports: [
        TranslateModule.forRoot(),
        CommonModule,
        IonicModule.forRoot(),
        ItemModule,
        TranslateModule.forRoot(),
        ],providers:[UntypedFormBuilder]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
