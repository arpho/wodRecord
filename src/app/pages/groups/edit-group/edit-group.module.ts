import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditGroupPageRoutingModule } from './edit-group-routing.module';

import { EditGroupPage } from './edit-group.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditGroupPageRoutingModule,
    DynamicFormModule
  ],
  declarations: []
})
export class EditGroupPageModule {}
