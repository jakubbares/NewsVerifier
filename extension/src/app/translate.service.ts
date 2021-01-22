import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Sentence, Word} from '../helper/classes';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from './auth.service';

@Injectable()
export class TranslateService {
  constructor(private http: HttpClient,
              private auth: AuthService,
              private db: AngularFirestore) {
  }
  private googleUrl = 'https://translation.googleapis.com/language/translate/v2';
  private baseUrl = 'http://localhost:5000';
  private key = 'AIzaSyC-vM0PPnU68_dhUBI6FVh7oxHBX7iz-HA';
  detectedLanguage: string;

  detectLanguage(paragraphs: Sentence[]) {
    const excerpt = paragraphs.slice(0, 5).map(p => p.text).join(' ');
    return this.http.get(this.googleUrl + '/detect', {params: {key: this.key, q: excerpt}});
  }

  translateAll(paragraphs: Sentence[]) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };
    const { motherLanguage, learnedLanguage } = this.auth.userData;
    const target = this.detectedLanguage === learnedLanguage ? motherLanguage : learnedLanguage;
    const sentences = paragraphs.map(p => p.text);
    return this.http.post(this.baseUrl + '/translate/sentences', {target, sentences}, options);
  }

  translate(text: string) {
    const { motherLanguage, learnedLanguage } = this.auth.userData;
    const target = this.detectedLanguage === learnedLanguage ? motherLanguage : learnedLanguage;
    return this.http.get(this.googleUrl, {params: {key: this.key, target, q: text}});
  }

  translateWord(word: Word) {
    const { motherLanguage } =  this.auth.userData;
    return this.http.get(this.googleUrl, {params: {key: this.key, target: motherLanguage,
      source: this.detectedLanguage, q: word.string}});
  }
}
