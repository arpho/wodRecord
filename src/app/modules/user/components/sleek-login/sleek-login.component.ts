import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { configs, registrationStrategy } from 'src/app/configs/configs';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { translate } from '@ngneat/transloco';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { LoginRedirectorService } from '../../services/loginredirector/login-redirector.service';

@Component({
  selector: 'app-sleek-login',
  templateUrl: './sleek-login.component.html',
  styleUrls: ['./sleek-login.component.scss'],
})
export class SleekLoginComponent implements OnInit, OnDestroy {

  public loginForm: UntypedFormGroup;
  public loading: HTMLIonLoadingElement;
  buttonText = ""
  subscriptions: Subscription = new Subscription()
  ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    if (configs.registrationStrategy == registrationStrategy.regular) {
      this.subscriptions.add(this.translate.onLangChange.subscribe(() => {

      }))
    }
    if (configs.registrationStrategy == registrationStrategy.twoSteps) {
      this.buttonText = "Completa la registrazione "
    }


  }

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private redirector:LoginRedirectorService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  onSubmit() {
    console.log("submitting")
  }

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
          console.log("accessed")
          const auth = getAuth()
          console.log("current user",auth.currentUser)
          setPersistence(auth, browserLocalPersistence)
          this.loading.dismiss().then(async () => {
            this.router.navigateByUrl(await this.redirector.redirectTo());
          });
        },
        error => {
          console.log("error", error)
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
