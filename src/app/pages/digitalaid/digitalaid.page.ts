import { Component, OnDestroy, OnInit } from '@angular/core';
import { PatientComponent } from 'src/app/components/patient/patient.component';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { CreatePatientPage } from '../patients/create/create-patient.page';
import { EditPatientPage } from '../patients/edit-patient/edit-patient.page';

import { getAuth, signOut } from "firebase/auth";
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { ActionSheetController } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { configs } from 'src/app/configs/configs';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FunctionModel } from 'src/app/models/functionModel';
import { KempelenService } from 'src/app/services/kempelen/kempelen-service.service';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { Router } from '@angular/router';
import { MyAlertService } from 'src/app/modules/helpers/services/alert/my-alert-service.service';
import { createSolutionBuilderWithWatch } from 'typescript';

@Component({
  selector: 'app-digitalaid',
  templateUrl: './digitalaid.page.html',
  styleUrls: ['./digitalaid.page.scss'],
  /*   imports:[
      SignInWrapperComponent
    ] */
})


export class DigitalaidPage implements OnInit, OnDestroy {
  path = "assets/scans/1_R_37.stl"
  token: string
  localKempelen= false
  locked = configs.locked
  itemViewerComponent = PatientComponent
  $user: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel())
  readonly user: Observable<UserModel> = this.$user.asObservable()
  itemsList: PatientModel[] = []
  showCard=false
  filterFunction = (item: FunctionModel) => {
    /* const user = await this.users.fetchLoggedUser()
    const customer = new CustomerModel(user)
    console.log("function ", item)
    console.log("enabled ",customer.hasFunctionEnabled(item.key))
    return customer.hasFunctionEnabled(item.key) */
    return true
  }
async presentToken(){

  this.showCard= !this.showCard
}

  titleFactory = (item: PatientModel) => {
    return `${item.firstName} ${item.lastName}`
  }
  showToken = configs.showToken;
  filterFeatures = (item: FunctionModel) => { return item.url }
  createPage = CreatePatientPage
  editPage = EditPatientPage
  subscriptions: Subscription = new Subscription()
  language: any
  userName
  listHead: string;
  usersToken: any;
  spinner: boolean;
  constructor(private users: UsersService,
    private http: HttpClient,
    private myAlert:MyAlertService,
    public Patients: PatientsService,
    private translateConfigService: TranslateConfigService,
    private translate: TranslateService,
    public actionSheetController: ActionSheetController,
    public functionsService: FunctionsService,
    private kempelen: KempelenService,
    private authorization: AuthService,
    private router: Router
  ) {
  }

  asyncFilter = async function (array2BeFiltered: any[], filter) {
    const mapper = async (item) => {
      console.log("mapping", item)
      const keep = await filter(item._id)
      return { keep: await filter(item._id), data: item }
    }
    // const mapped = await Promise.all(array2BeFiltered.map(mapper))
    try {
      const resolved = await Promise.all(array2BeFiltered.map(mapper))
      console.log("resolved", resolved)
      return resolved.map((item) => {
        return item.keep ? item.data : undefined
      }).filter(item => { return item != undefined })
    }
    catch (error) {
      console.log("errore", error)
    }
  }

  authFilter = (key: string) => {
    console.log("filtering", key)
    return new Promise((resolve, reject) => {
      const url = `https://us-central1-digitalaid-61011.cloudfunctions.net/api2/authorizations/canuseproject?_id=${key}`;

      const options = {
        hostname: "us-central1-digitalaid-61011.cloudfunctions.net",
        path: `/api2/authorizations/canuseproject?_id=key}`,
      }
      this.kempelen.canUse(key, this.token).subscribe(result => {
        console.log("can use ", key, result)
        resolve(result)
      }, error => {
        console.log("errore", error)
        reject(error)
      })

    })

  }





  ngOnDestroy(): void {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe()
    }
  }

  async ngOnInit() {
    this.usersToken = await this.authorization.getPromisedToken()
    this.localKempelen=configs.localKempelen
    this.token = await this.users.getToken()
    this.translate.use(this.translateConfigService.currentLang)
    this.functionsService.publish(await this.functionsService.fetchItems())
    const loggedUser = await this.users.fetchLoggedUser()
    this.$user.next(loggedUser)

    this.subscriptions.add(this.translate.get("Pazienti").subscribe(value => {
      this.listHead = value
    }))
    this.subscriptions.add(this.translate.onLangChange.subscribe(event => {

      this.subscriptions.add(this.translate.get("Pazienti").subscribe(value => {
        this.listHead = value
      }))
    }))

    this.userName = loggedUser.displayName || loggedUser.email
    const patients = await this.Patients.fetchAllPatientsforUser(loggedUser.key)

    const handler = (data) => {
      this.Patients.publish(data.docs.map(doc => { return new PatientModel(doc.data()).setKey(doc.id) }))

    }
    this.Patients.realTimeFetchAllPatients4User(loggedUser.key, handler)
    this.itemsList = patients
    //this.kempelen.borrowProject(await this.usersToken as unknown as string,"t3IeTXvDD4bBJePbDv0LGbOubO93","655e0ec87595c980e409658f").subscribe(data=>{console.log("borrowed project",data)})
    /*   this.kempelen.fetchProjectsList(await this.usersToken).subscribe(projects=>{
      }) */

    if (loggedUser.isProvider && configs.navigate2dash) {
      this.router.navigate(['providers-dashboard'])
    }

  }
  async test() {
    console.log("request")
    this.spinner = true
    this.kempelen.test(this.token, "6603006db72451701b0f1bdb").subscribe(async result => {
      this.spinner = false

      console.log("result", result)
      /*  const filtered = this.asyncFilter(result['original'],this.authFilter)
       filtered.then(v=>{
       console.log("filtered",v)
       this.spinner= false
   
       }) */
    }, (error) => {
      this.spinner = false
      console.log("errore", error)
    })
  }
  isProvider(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.user.subscribe(user => {
        resolve(user.isProvider)
      })
    })
  }

  async deleteItem(patient: ItemModelInterface) {
    const userKey = (await this.users.fetchLoggedUser()).key
    return this.Patients.deleteItem(userKey, patient.key)
  }

  async changeLanguage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'Italiano',
        icon: 'language-outline',
        handler: () => {
          this.language = 'it';
          this.translateConfigService.setLanguage('it');

        }
      }, {
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.translateConfigService.setLanguage('en');

        }
      }, {
        text: 'Español',
        icon: 'language-outline',
        handler: () => {
          this.language = 'es';
          this.translateConfigService.setLanguage('es');

        }
      }, {
        text: 'Deutsch',
        icon: 'language-outline',
        handler: () => {
          this.language = 'de';
          this.translateConfigService.setLanguage('de');

        }
      }, {
        text: 'Français',
        icon: 'language-outline',
        handler: () => {
          this.language = 'fr';
          this.translateConfigService.setLanguage('fr');

        }
      }, {
        text: 'Nederlands',
        icon: 'language-outline',
        handler: () => {
          this.language = 'nl';
          this.translateConfigService.setLanguage('nl');

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
  logout() {
    const auth = getAuth();
    signOut(auth)
  }

}
