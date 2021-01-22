import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../environments/environment";


@Injectable()
export class APIService {
  private baseUrl = `${environment.apiUrl}`;
  constructor(
    private http: HttpClient
  ) {
  }

  getAnalysis({title, sentences}) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    return this.http.post(this.baseUrl + '/analyze', JSON.stringify({ title, sentences }), options);
  }

}



