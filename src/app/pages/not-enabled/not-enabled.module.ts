import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotEnabledPageRoutingModule } from './not-enabled-routing.module';

import { NotEnabledPage } from './not-enabled.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotEnabledPageRoutingModule,
    TranslateModule.forRoot()
  ],
  declarations: [NotEnabledPage]
})
export class NotEnabledPageModule {}
