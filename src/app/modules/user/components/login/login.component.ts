import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { configs, registrationStrategy } from 'src/app/configs/configs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: UntypedFormGroup;
  public loading: HTMLIonLoadingElement;
  buttonText = ""
  ngOnInit() {
    if (configs.registrationStrategy == registrationStrategy.regular) {
      this.buttonText = "Registra Utente"
    }
    if (configs.registrationStrategy == registrationStrategy.twoSteps) {
      this.buttonText = "Completa Registrazione "
    }


  }

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  onSubmit() { }

  register() {
    if (configs.registrationStrategy == registrationStrategy.regular) {
      this.router.navigateByUrl("users/signup")
    }
    if (configs.registrationStrategy == registrationStrategy.twoSteps) {
      this.router.navigateByUrl("users/complete-registration")
    }
  }
  async loginUser(loginForm: UntypedFormGroup): Promise<void> {

    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value:", loginForm.value);
    } else {
      const email = loginForm.value.email;
      const password = loginForm.value.password;
      this.authService.loginUser(email, password).then(
        () => {
          const auth = getAuth()
          setPersistence(auth, browserLocalPersistence)
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("home");
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: "Ok", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }

}
