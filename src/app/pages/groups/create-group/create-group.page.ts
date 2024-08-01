import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GroupModel } from 'src/app/models/groupModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.page.html',
  styleUrls: ['./create-group.page.scss'],
})
export class CreateGroupPage implements OnInit {
  providerKey: string;

  constructor(
    private modalCtrl:ModalController,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService,
    private service:GroupService,
    private navParams:NavParams,
    private toaster:MyToastService
  ) {
    translate.use(translateConfig.currentLang)
   }

  group= new GroupModel()
  formFields = []


  dismiss(data?:GroupModel){
    this.modalCtrl.dismiss(data)
  }
  submitText = "crea gruppo"

  submit(ev){
    this.group.build(ev)
    console.log("submitting", this.group)
    this.service.createItem(this.group,this.providerKey).then(async (v)=>{
      this.group.key=v.id
      this.toaster.presentToast(await this.translate.get("correctlyCreatedGroup").toPromise())
      this.dismiss(this.group)
    }).catch(async (error)=>{

      this.toaster.presentToast(await this.translate.get("troubleOnCreatingGroup").toPromise())
      this.dismiss()
    })
        
  }
  filter(ev){
    console.log("typing",ev)
  }

  ngOnInit() {
    this.providerKey = this.navParams.data.data4Modal
    console.log("provider's key",this.providerKey)
    this.formFields = [
      new TextboxQuestion({
        label:"title",
        key:"title"
      })
    ]
  }

}
