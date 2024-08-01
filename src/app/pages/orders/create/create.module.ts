import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePageRoutingModule } from './create-routing.module';

import { CreateOrderPage } from './create-order.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
/* import {MatStepperModule} from '@angular/material/stepper'
import { MatInputModule} from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatAutocompleteModule } from '@angular/material/autocomplete' */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePageRoutingModule,
    DynamicFormModule,
/*     MatStepperModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule */
  ],
  declarations: [CreateOrderPage]
})
export class CreatePageModule {}
