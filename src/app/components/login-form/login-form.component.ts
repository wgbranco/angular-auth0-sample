import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../login-form/credentials-model';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginFormComponent implements OnInit {
  @Input() locked: boolean;
  @Output() onClickSubmit = new EventEmitter<Credentials>();

  credentialsForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.credentialsForm = this.createForm();
  }

  createForm(): FormGroup
  {
    return this._fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  prepareCredentials(): Credentials
  {
    const formModel = this.credentialsForm.value;
    return {
      email: formModel.email,
      password: formModel.password
    };
  }

  onSubmit() {
    const credentials: Credentials = this.prepareCredentials();
    this.onClickSubmit.emit(credentials);
  }

}
