import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, 
      withPreloading(PreloadAllModules)),
       provideFirebaseApp(() => initializeApp({"projectId":"m1crossfit-5b2b9",
        "appId":"1:959204307943:web:24ed9f53f6b914d0608342",
        "databaseURL":"https://m1crossfit-5b2b9.firebaseio.com",
        "storageBucket":"m1crossfit-5b2b9.firebasestorage.app",
        "apiKey":"AIzaSyDh_aGD_ksup-PasR7ewLjHjZ7qHjoSzgQ",
        "authDomain":"m1crossfit-5b2b9.firebaseapp.com",
        "messagingSenderId":"959204307943"})),
         provideAuth(() => getAuth()),
          provideFirestore(() => getFirestore()),
           provideDatabase(() => getDatabase()), 
           provideFunctions(() => getFunctions()),
            provideMessaging(() => getMessaging()), 
            providePerformance(() => getPerformance()), 
            provideStorage(() => getStorage()),
            provideFirebaseApp(() => initializeApp({"projectId":"m1crossfit-5b2b9",
              "appId":"1:959204307943:web:24ed9f53f6b914d0608342",
              "databaseURL":"https://m1crossfit-5b2b9.firebaseio.com",
              "storageBucket":"m1crossfit-5b2b9.firebasestorage.app",
              "apiKey":"AIzaSyDh_aGD_ksup-PasR7ewLjHjZ7qHjoSzgQ",
              "authDomain":"m1crossfit-5b2b9.firebaseapp.com",
              "messagingSenderId":"959204307943"})), 
              provideAuth(() => getAuth()), 
              provideAnalytics(() => getAnalytics()),
               ScreenTrackingService,
                UserTrackingService, 
                provideFirestore(() => getFirestore()),
                 provideDatabase(() => getDatabase()), 
                 provideFunctions(() => getFunctions()),
                  provideMessaging(() => getMessaging()), 
                  providePerformance(() => getPerformance()), 
                  provideStorage(() => getStorage()),
  ],
});
