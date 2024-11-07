import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInput, IonLabel, IonItem, IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonLabel,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
  
  ]
})
export class LoginPage implements OnInit {
loginForm: FormGroup 
email="";
password="";
  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    }); }

  ngOnInit() {
  }

}
