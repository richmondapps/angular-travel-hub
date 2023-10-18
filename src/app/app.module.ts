import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getAuth,  provideAuth }
from '@angular/fire/auth';
import { getFirestore, provideFirestore }
from '@angular/fire/firestore';
import { getStorage, provideStorage }
from '@angular/fire/storage';
import { provideFunctions, getFunctions } from '@angular/fire/functions';

import { environment } from 'src/environments/environment';
import { SharedModule } from './shared/shared.module';
import { NavModule } from './shared/nav/nav.module';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
    provideFunctions(() => getFunctions()),
    SharedModule,
    NavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
