import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public service: AppService,
              private router: Router,
              private auth: AuthService) {
    window['app'] = this;
  }
}


