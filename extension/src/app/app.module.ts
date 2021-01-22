import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import {AppService} from './app.service';
import {AuthService} from './auth.service';
import {SignInComponent} from './sign-in/sign-in.component';
import {SettingsComponent} from './settings/settings.component';
import {TranslateService} from './translate.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {FormsModule} from '@angular/forms';
import {LogOutComponent} from './logout/log-out.component';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {ProcessComponent} from './components/process/process.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {firebaseConfig} from "./credentials";


@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    LogOutComponent,
    SettingsComponent,
    ProcessComponent,
  ],
  imports: [
    MatSelectModule,
    InputTextModule,
    DropdownModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    FormsModule,
  ],
  providers: [
    AppService,
    AuthService,
    AngularFireAuth,
    TranslateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
