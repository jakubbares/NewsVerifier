import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignIn} from '../../helper/classes';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  registerMode = false;
  input = new SignIn();
  form: FormGroup;
  constructor(public auth: AuthService) {
    window['sign'] = this;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.input.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(4),
      ]),
      password: new FormControl(this.input.password, [
        Validators.required,
        Validators.minLength(8)
      ]),
    });
  }

  toggleRegister() {
    this.registerMode = !this.registerMode;
  }

  get email() { return this.form.get('email'); }

  get password() { return this.form.get('password'); }


}


