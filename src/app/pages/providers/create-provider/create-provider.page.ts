import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ProvidersModel } from 'src/app/models/providersModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';

@Component({
  selector: 'app-create-provider',
  templateUrl: './create-provider.page.html',
  styleUrls: ['./create-provider.page.scss'],
})
export class CreateProviderPage implements OnInit {
  provider:ProvidersModel 
  submitText="crea provider"
  formFields= [
    new TextboxQuestion(
      {
        key:"denominazione",label:"denominazione",
        required:true
      }
    )
  ]

  constructor(
    private modalCtrl:ModalController,
    private toaster:MyToastService
,
private service: ProvidersService
) { }

  close(provider?){
    this.modalCtrl.dismiss(provider)
  }

  ngOnInit() {
    this.provider = new ProvidersModel()
  }

  filter(ev){
    console.log("typing",ev)
  }

  submit(ev){
    console.log("submitting",ev)
    this.provider = new ProvidersModel(ev)
    console.log("provider",this.provider)

    this.service.createItem(this.provider).then(res=>{
      console.log("created provider",res)
      this.toaster.presentToast("provider creato correttamente")
    }).catch(err=>{
      console.error(err)
      this.toaster.presentToast("ho riscontrato dei problemi",'top',10000)
    }).finally(()=>{
      this.close(this.provider)}
    )
  }

}
