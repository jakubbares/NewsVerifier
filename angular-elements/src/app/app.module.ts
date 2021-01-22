import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Injector, ComponentFactoryResolver, ApplicationRef} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from './config/credentials';
import { AppComponent } from './app.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ElementZoneStrategyFactory} from 'elements-zone-strategy';
import {FireStoreService} from "./firestore.service";
import {ComparedSentenceComponent} from "./components/compared-sentence/compared-sentence.component";
import {AnalyzedSentenceComponent} from "./components/analyzed-sentence/analyzed-sentence.component";
import {HeaderComponent} from "./components/header/header.component";

@NgModule({
  declarations: [
    AppComponent,
    ComparedSentenceComponent,
    AnalyzedSentenceComponent,
    HeaderComponent
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    BrowserModule,
    HttpClientModule],
  providers: [FireStoreService],
  entryComponents: [
    AppComponent,
    ComparedSentenceComponent,
    AnalyzedSentenceComponent,
    HeaderComponent
  ]
})
export class AppModule {
  constructor(private injector: Injector) {
    const factoryContent = new ElementZoneStrategyFactory(AppComponent, injector);
    if (!customElements.get('app-content')) {
      const content = createCustomElement(AppComponent, {injector, strategyFactory: factoryContent});
      customElements.define('app-content', content);
    }
  }
  ngDoBootstrap() {}
}

