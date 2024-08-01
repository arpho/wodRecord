import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AsyncEnablingCodeValidator } from 'src/app/business/asyncEnablingCodeValidator';
import { enablingCodeMaker } from 'src/app/business/EnablingCodeMaker';
import { configs } from 'src/app/configs/configs';
import { Customer } from 'src/app/models/Customer';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { EnablingCodeQuestion } from 'src/app/modules/dynamic-form/models/question-enablingCode';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { EnablingCode } from 'src/app/modules/user/models/enablingCode';
import { EnablingCodeService } from 'src/app/modules/user/services/codes/enabling-code.service';
import { CustomersService } from 'src/app/services/customers/customers-service.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.page.html',
  styleUrls: ['./new-customer.page.scss'],
})
export class NewCustomerPage implements OnInit {
  submitText = "preregistra utente"

  constructor(private service: CustomersService,
    private modalCtrl: ModalController,
    private toaster: MyToastService,
    private codes: EnablingCodeService
  ) { }
  customer = new CustomerModel()

  formFields = [

  ]
  dismiss(v?: {}) {
    this.modalCtrl.dismiss(v)
  }


  ngOnInit() {
    this.customer.dor = undefined // l'utente non si è ancora registrato
    this.setFormFields()
  }

  setFormFields() {
    this.formFields = []
    const codeMaker = new enablingCodeMaker(this.codes)
    this.formFields = [
      new TextboxQuestion({
        label: "nome",
        key: "firstName",
        value: this.customer.firstName
      }),
      new TextboxQuestion({
        key: "lastName",
        label: "Cognome",
      }),
      new EmailQuestion({
        label: "email",
        key: "email",
        required: true,
        value: this.customer.email
      }),
      new SwitchQuestion({
        key:'provider',
        label:'provider',
        labelFalse:'operatore',
        labelTrue:'provider',
        iconFalse:'construct-outline',
        iconTrue:'bussiness-outline'

      })
    ]
  }


  filter(ev) {
    console.log("typing ", ev)
  }


  getUser() {
    console.log("get user")
    this.service.getUser("a@iol.it").then(res => {
      console.log("got user", res)
    }).catch(err => {
      console.error("error", err)
    })

  }


  submit(ev) {
    console.log("submitted", ev)
    this.customer.load(ev)
    this.customer.dor = undefined
    console.log("new user", this.customer)
    this.service.setItem(this.customer).then(async () => {
      this.toaster.presentToast("utente inizializzato correttamente");
      this.dismiss()
    }).catch(err => {
      console.log("errore", err)
      this.toaster.presentToast("ho riscontrato dei problemi, riprova")
    })
  }

}
