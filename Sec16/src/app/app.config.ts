import { ApplicationConfig } from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withRouterConfig,
} from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withRouterConfig({
        paramsInheritanceStrategy: 'always',
      })
    ), provideFirebaseApp(() => initializeApp({"projectId":"ng-deployment-example-9fb07","appId":"1:489026928294:web:0295b3459ae8507c1fbe67","storageBucket":"ng-deployment-example-9fb07.firebasestorage.app","apiKey":"AIzaSyAii-HRx57FjYPE1WyjOSq3L84ywidV5NM","authDomain":"ng-deployment-example-9fb07.firebaseapp.com","messagingSenderId":"489026928294"})), provideFirestore(() => getFirestore()),
  ],
};
