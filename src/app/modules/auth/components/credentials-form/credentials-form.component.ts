import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Credentials } from '../../models/credentials';

@Component({
  selector: 'credentials-form',
  templateUrl: './credentials-form.component.html',
  styleUrls: ['./credentials-form.component.scss']
})
export class CredentialsFormComponent implements OnInit {
    @Input() pending: boolean;
    @Input() buttonLabel: string;
    @Output() onSubmit = new EventEmitter<Credentials>();
  
    form: FormGroup;
  
    constructor(private _fb: FormBuilder) { }
  
    ngOnInit() {
      this.form = this.createForm();
    }
  
    createForm(): FormGroup
    {
      return this._fb.group({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
    }
  
    submitted()
    {
      if (this.form.valid)
        this.onSubmit.emit(this.form.value);
    }
  
  }
  