import { Component } from '@angular/core';
import {AuthService} from '../auth.service';



@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent {
  constructor(public auth: AuthService) {
  }


}


