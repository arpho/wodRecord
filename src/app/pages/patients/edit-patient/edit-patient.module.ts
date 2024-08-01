import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPatientPageRoutingModule } from './edit-patient-routing.module';

import { EditPatientPage } from './edit-patient.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { ListInjectableItemsComponent } from 'src/app/modules/item/components/list-injectable-items/list-injectable-items.component';
import { ViewPatientComponent } from 'src/app/components/view-patient/view-patient.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPatientPageRoutingModule,
    DynamicFormModule,
    
    
  ],
  declarations: []
})
export class EditPatientPageModule {}
