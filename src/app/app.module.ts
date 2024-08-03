import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { HelpersModule } from './modules/helpers/helpers.module';
import { ItemModule } from './modules/item/item.module';
import { UserModule } from './modules/user/user.module';
import { LocationViewerComponent } from './components/viewers/location-viewer/location-viewer.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CreateFunctionsPageModule } from './pages/functions/create-functions/create-functions.module';
import { EnabledFunctionsComponent } from './modules/dynamic-form/components/enabled-functions/enabled-functions.component';
import { ListInjectableItemsComponent } from './modules/item/components/list-injectable-items/list-injectable-items.component';

@NgModule({
  declarations: [
    AppComponent,
  LocationViewerComponent,
  ListInjectableItemsComponent,

],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule,
     CreateFunctionsPageModule,
     EnabledFunctionsComponent,
     DynamicFormModule,
   /*      ItemModule,
        HelpersModule,*/
        UserModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [HttpClient]
          }
        })
      ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}