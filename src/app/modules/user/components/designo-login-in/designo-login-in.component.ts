import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { configs } from 'src/app/configs/configs';
import { AuthService } from '../../services/auth.service';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-designo-login-in',
  templateUrl: './designo-login-in.component.html',
  styleUrls: ['./designo-login-in.component.scss'],
})
export class DesignoLoginInComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public loading: HTMLIonLoadingElement;
  buttonText = ""
  ngOnInit() {

      this.buttonText = "Registra Utente"




  }


  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private users:UsersService,
    private authService: AuthService,
    private router: Router,
    private formBuilder: UntypedFormBuilder) {

      this.loginForm = this.formBuilder.group({
        email: ["", Validators.compose([Validators.required, Validators.email])],
        password: [
          "",
          Validators.compose([Validators.required, Validators.minLength(6)])
        ]
      });
     }



     register() {

        this.router.navigateByUrl("users/signup")


    }
    onSubmit() { }

     async loginUser(loginForm: UntypedFormGroup): Promise<void> {

      if (!loginForm.valid) {
        console.log("Form is not valid yet, current value:", loginForm.value);
      } else {
        const email = loginForm.value.email;
        const password = loginForm.value.password;
        console.log(`email=${loginForm.value.email} pwd:${loginForm.value.password}`)
        this.authService.loginUser(email, password).then(
          async () => {
            const auth = getAuth()
            console.log("auth",auth)
            const loggedUser = await this.users.fetchLoggedUser()
            console.log("logged user",loggedUser)
            setPersistence(auth, browserLocalPersistence)
            this.loading.dismiss().then(() => {
              console.log("router",this.router)
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
