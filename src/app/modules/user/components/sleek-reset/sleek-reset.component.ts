import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { getAuth, setPersistence, browserLocalPersistence, sendPasswordResetEmail } from 'firebase/auth';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { configs, registrationStrategy } from 'src/app/configs/configs';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sleek-reset',
  templateUrl: './sleek-reset.component.html',
  styleUrls: ['./sleek-reset.component.scss'],
})
export class SleekResetComponent implements OnInit {

  public resetForm: UntypedFormGroup;
  public loading: HTMLIonLoadingElement;
  buttonText = ""
  ngOnInit() {
    if (configs.registrationStrategy == registrationStrategy.regular) {
      this.buttonText = "Registra Utente"
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
    private toaster:MyToastService,
    private formBuilder: UntypedFormBuilder
  ) {
    this.resetForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
    });

  }
  onSubmit() {
    console.log("submit")
   }

 
  async resetPassword(resetForm:UntypedFormGroup){
    console.log((resetForm.value))
    const auth = getAuth()
    sendPasswordResetEmail(auth,resetForm.value.email).then((()=>{
      this.toaster.presentToast(" riceverai una mail con il link per impostare una nuova password")

    })).catch((err)=>{
      console.log("errore",err)
      this.toaster.presentToast(`la mail inserita:${resetForm.value.email} non è registrata`)
    })
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
