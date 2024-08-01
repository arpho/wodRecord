import { Component, OnDestroy, OnInit } from "@angular/core";
import { UntypedFormGroup, Validators, UntypedFormBuilder } from "@angular/forms";
import { LoadingController, AlertController, ActionSheetController } from "@ionic/angular";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import { browserLocalPersistence, getAuth, setPersistence } from "firebase/auth";
import { configs, registrationStrategy } from "src/app/configs/configs";
import { TranslateConfigService } from "src/app/services/translate/translate-config.service";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit, OnDestroy {
  public loginForm: UntypedFormGroup;
  public loading: HTMLIonLoadingElement;
  subscrions: Subscription = new Subscription()
  buttonText = ""
  language = ''
  ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    if (configs.registrationStrategy == registrationStrategy.regular) {
      this.subscrions.add(

        this.translate.onLangChange.subscribe(event => {
          this.subscrions.add(this.translate.get('register').subscribe(value => {
            this.buttonText = value
          }))
        })
      )
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
    private formBuilder: UntypedFormBuilder,
    private actionSheetController: ActionSheetController,
    private translateConfig: TranslateConfigService,
    private translate: TranslateService
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
    this.subscrions.unsubscribe()
  }
  onSubmit() { }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'Italiano',
        icon: 'language-outline',
        handler: () => {
          this.language = 'it';
          this.translate.use('it');

        }
      }, {
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translate.use('en');

        }
      }, {
        text: 'Español',
        icon: 'language-outline',
        handler: () => {
          this.language = 'es';
          this.translate.use('es');

        }
      }, {
        text: 'Deutsch',
        icon: 'language-outline',
        handler: () => {
          this.language = 'de';
          this.translate.use('de');

        }
      }, {
        text: 'Français',
        icon: 'language-outline',
        handler: () => {
          this.language = 'fr';
          this.translate.use('fr');

        }
      }, {
        text: 'Nederlands',
        icon: 'language-outline',
        handler: () => {
          this.language = 'nl';
          this.translate.use('nl');

        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
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
