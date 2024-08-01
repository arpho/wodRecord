import { Component, OnInit,Input } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GroupModel } from 'src/app/models/groupModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { GroupService } from 'src/app/services/groups/group.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.page.html',
  styleUrls: ['./edit-group.page.scss'],
})
export class EditGroupPage implements OnInit {
 group:GroupModel= new GroupModel()
 formFields = []
 providerKey:string
  constructor(
    private modalCtrl:ModalController,
    private service:GroupService,
    private navParams:NavParams,
    private translate:TranslateService,
    private translateServiceConfig:TranslateConfigService
  ) { }

  submitText="modifica gruppo"

  filter(ev){
    console.log("typing",ev)
  }
  submit(ev){
    this.group.initialize(ev)
    console.log("ready to save",this.group)
    this.service.updateItem(this.group,this.providerKey)
    this.dismiss(this.group)
  }
  dismiss(val?:GroupModel){
    this.modalCtrl.dismiss(val)
  }

  ngOnInit() {
    this.translate.use(this.translateServiceConfig.currentLang)
this.providerKey= this.navParams.data.extra

    this.group.initialize( this.navParams.data.data)
    console.log("group to edit",this.group,this.providerKey)
    this.formFields= [
      new TextboxQuestion({
        key:"title",
        label:"title",
        value:this.group.title
      })
    ]
  }

}
