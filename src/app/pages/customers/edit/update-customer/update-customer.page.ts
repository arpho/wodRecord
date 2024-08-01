import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { configs } from 'src/app/configs/configs';
import { FunctionModel } from 'src/app/models/functionModel';
import { ProvidersModel } from 'src/app/models/providersModel';
import { EnabledFunctionsQuestion } from 'src/app/modules/dynamic-form/models/enabledFunctionsQuestion';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { CreateProviderPage } from 'src/app/pages/providers/create-provider/create-provider.page';
import { CustomersService } from 'src/app/services/customers/customers-service.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.page.html',
  styleUrls: ['./update-customer.page.scss'],
})


export class UpdateCustomerPage implements OnInit {
  firstNameLabel: string
  usersPrivilegesLabel: string
  lastNameLabel: string
  enabledLabel: string


  formFields: any[] = [// devo inizializzare subito con dei valori perchè question-control.service non è implementato per gestire campi asincroni
    new TextboxQuestion({
      key: "firstName",
      label: "name",
      required: true,
    }),
    new TextboxQuestion({
      key: "lastName",
      label: "cognome",
      required: true
    }),
    new EmailQuestion({
      key: 'email',
      label: 'email',
    }),
    new TextboxQuestion({
      key: "displayName",
      label: " display name",
    }),
    new DropdownQuestion({
      key: "level",
      label: "privilegi utente",
      options: configs.accessLevel,
    }),
    new SwitchQuestion({
      key: 'provider',
      label: 'provider',
      labelFalse: 'operatore',
      labelTrue: 'provider',
      iconFalse: 'accessibility-outline',
      iconTrue: 'business-outline',

    }),
    new SwitchQuestion({
      key: "enabled",
      label: 'abilitato',
      iconTrue: "checkmark-circle",
      iconFalse: "close-circle",
      labelFalse: "utente non abilitato",
      labelTrue: "utente abilitato"
    }),
    
    new EnabledFunctionsQuestion({
      key: "enabledFunctions",
      //value:this.customer.enabledFunctions
      label: "funzioni abilitate"
    }),
    new DateQuestion({
      key: "expirationDate",
      label: "data",
      presentation: "date",
    })
  ]
  customer = new CustomerModel()
  functionsList: FunctionModel[] = []
  notEnabledUser: any;
  expiringDateSubscriptionLabel: any;
  enabledFunctionsLabel: any;
  async translateText() {
    this.firstNameLabel = await this.translate.get("firstName").toPromise()
    this.lastNameLabel = await this.translate.get("lastName").toPromise()
    this.usersPrivilegesLabel = await this.translate.get("userPrivileges").toPromise()
    this.enabledLabel = await this.translate.get("enabled").toPromise()
    this.enabledLabel = await this.translate.get("utente abilitato").toPromise()
    this.notEnabledUser = await this.translate.get("utente non abilitato").toPromise()
    this.notEnabledUser = await this.translate.get("utente non abilitato").toPromise()
    this.expiringDateSubscriptionLabel = await this.translate.get(" expring date subscription").toPromise()
    this.enabledFunctionsLabel = await this.translate.get("enabledFunctions").toPromise()

  }
  filter(ev) {
  }

  async submit(ev) {
    const enabledFunctionsmapper = (f: any) => {
      return { key: f['enabledFunction'].key, endTime: f.endTime }
    }
    ev.enabledFunctions = ev.enabledFunctions?.map(enabledFunctionsmapper)
    console.log("form",ev)
    this.customer.load(ev)
    this.customer.providerKey =(ev.providerKey && ev.providerKey.key)? ev.providerKey.key: ""
    console.log("submitting customer",this.customer)
    this.service.updateItem(this.customer)

    /*  const result = await this.service.addCustomClaim({
       email: this.customer.email,
       claims: {
         expirationTime: this.customer._expirationTime,
         enabled: this.customer.enabled,
         level: this.customer.level,
         userType: this.customer.userType
       }
     }) */
    this.toaster.presentToast("user updated")
    this.dismiss(this.customer)

  }


  dismiss(customer?: UserModel) {
    this.modalCtrl.dismiss(customer)
  }
  enabledFunctions
  customersProvider:ProvidersModel
  constructor(public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: CustomersService,
    public providersService:ProvidersService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    public functionsService: FunctionsService,
    private toaster: MyToastService) {
    

  }

  /**trasforma enabledFunction from {key:string,endTime:number} nel formato accettato da EnabledFunction.component */
  enabledFunctionAdapter(that, arg: {}): Promise<{ enabledFunction: FunctionModel, endTime: number }> {
    return new Promise(async (resolve, reject) => {
      if (arg['key']) {
        const enabledFunction = (await that.functionsService.getItem(arg['key']))
        resolve({ enabledFunction: enabledFunction, endTime: arg['endTime'] })
      }
      else {
        //reject(new Error("no key for function"))
        resolve({enabledFunction:new FunctionModel({}),endTime:-1})
        console.log("no function with key",arg['key'])
      }
    })

  }
  

  async ngOnInit() {
    console.log("fetching providers for selectorQuestion")
    this.providersService.publish( await this.providersService.fetchItems())
    this.translate.use(this.translateConfig.currentLang)
    this.functionsList = await this.functionsService.fetchItems()
    this.translate.use(this.translateConfig.currentLang)
    this.customer.load(this.navParams.get("item"))
   
    const enabledFunctionWrapper = (item) => {
      return this.enabledFunctionAdapter(this, item)
    }
    const resolvedEnabledFunctions = this.customer.enabledFunctions?await Promise.all(this.customer.enabledFunctions.map(enabledFunctionWrapper)):[];
    //this.enabledFunctions = 

    this.formFields = [
      new TextboxQuestion({
        key: "firstName",
        label: "first name",
        required: true,
        value: this.customer.firstName
      }),
      new TextboxQuestion({
        key: "lastName",
        label: "last name",
        value: this.customer.lastName,
        required: true
      }),
      new EmailQuestion({
        key: 'email',
        label: 'email',
        value: this.customer.email
      }),
      new TextboxQuestion({
        key: "displayName",
        label: " display name",
        value: this.customer.displayName
      }),
      new DropdownQuestion({
        key: "level",
        label: "privilegi utente",
        options: configs.accessLevel,
        value: this.customer.role.value,

      }),
      new SelectorQuestion({key:"providerKey",
        label:"provider di riferimento",
        service:this.providersService,
        text:" the provider",
        value: this.customer.providerKey? await this.providersService.getItem(this.customer.providerKey):new ProvidersModel(),
      // only if the user is enabled to create 
        createPopup:await this.fetchCreateProviderPage() //CreateProviderPage 
      }),
      new SwitchQuestion({
        key: 'provider',
        label: 'provider',
        labelFalse: 'operatore',
        labelTrue: 'provider',
        iconFalse: 'accessibility-outline',
        iconTrue: 'business-outline',
        value: this.customer.isProvider

      }),

      new SwitchQuestion({
        key: "enabled",
        label: "abilitazione utente",
        value: this.customer.enabled,
        iconTrue: "checkmark-circle",
        iconFalse: "close-circle",
        labelFalse: "utente non abilitato",
        labelTrue: "utente abilitato"
      }),
      new EnabledFunctionsQuestion({
        key: "enabledFunctions",
        value: resolvedEnabledFunctions,
        label: this.enabledFunctionsLabel
      }),
      new DateQuestion({
        key: "expirationDate",
        label: "data di fine abbonamento",
        presentation: "date",
        value: this.customer.expirationDate
      }),
      new DateQuestion({
        label: "birthdate",
        key: "birthdate",
        presentation: "date",
        value: this.customer.birthDate.formatDate()
      }),
      new SwitchQuestion({
        key:"provider_admin",
        label: "provider admin",
        value:this.customer.provider_admin
      })
    ]
  }
  fetchCreateProviderPage() {
   return new Promise(async (resolve,rejects)=>{
    this.customer.hasFunctionEnabled("HhdvZa2oc8lnEiPVm43s")?(resolve(CreateProviderPage)):(resolve(undefined))
   })
  }

}
