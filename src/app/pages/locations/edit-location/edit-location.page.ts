import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { LocationModel } from 'src/app/models/locationModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.page.html',
  styleUrls: ['./edit-location.page.scss'],
})
export class EditLocationPage implements OnInit {

  constructor(
    private modalCtrl:ModalController,
    private navParams:NavParams,
    private translate: TranslateService,
    private translateConfig:TranslateConfigService,
    private service:LocationsService,
    private toaster:MyToastService
  ) { }
  location:LocationModel
  providerKey:string
  formFields =[
  ]
  submitText =''
  
  filter(ev){
    console.log("typing",ev)
  }
  dismiss(location?:LocationModel){
    console.log("dismissing",location)
    this.modalCtrl.dismiss(location)
  }
  submit(ev){
    console.log("submitting",ev)
   this.location.build(ev)

console.log("updated location",this.location)
     this.service.setItem(this.location,this.providerKey).then((v)=>{
      this.toaster.presentToast("location modificata correttamente")
    }).catch(error=>{
      this.toaster.presentToast("ho riscontrato dei problemi")
      console.log("errore",error)
    }) 
    this.dismiss(this.location)
  }
  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    this.submitText = await this.translate.get("submitLocation").toPromise()
    this.location = this.navParams.data.data
    console.log("params",this.navParams.data)
    this.providerKey =this.navParams.data.extra
    console.log("provider key",this.providerKey)
    console.log("location to update",this.location)
    this.formFields =[ new TextboxQuestion({
      label:"city",
      key:"city",
      value:this.location.city
    }),
    new TextboxQuestion({
      label:"street",
      key:"street",
      value:this.location.street
    }),
    new TextboxQuestion({
      label:"house number",
      key:"houseNumber",
      value:this.location.houseNumber
    }),
    new TextboxQuestion({
      label:"house numbe suffix",
      key:"houseNumberSuffix",
      value:this.location.houseNumberSuffix
    }),
    new TextboxQuestion({
      key:"zipCode",
      label:"zip code",
      value:this.location.zipCode
    })]
  }

}
