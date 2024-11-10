import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//TODO  understand how to list items by status: active|deleted
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  
