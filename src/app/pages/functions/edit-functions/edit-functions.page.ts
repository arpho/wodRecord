import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import {FunctionModel} from '../../../models/functionModel'
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';

@Component({
  selector: 'app-edit-functions',
  templateUrl: './edit-functions.page.html',
  styleUrls: ['./edit-functions.page.scss'],
})
export class EditFunctionsPage implements OnInit {
  function2edit: FunctionModel = new FunctionModel
  title: string

  submitText ="crea nuova funzione"
  formFields = [
    new TextboxQuestion({
      label:"funzione",
      key:"title",
    }),
    new TextAreaBox({
      label:"note",
      key:"note",
    }),
    new TextAreaBox({
      label:"description",
      key:"description",
    }),
    new TextboxQuestion({
      label:'icon',
    key:'icon',}),
    new TextboxQuestion({
      label:"url's page",
      key:'url',
    }),
    new SwitchQuestion({
      labelTrue:"autorizzato",
      labelFalse:"notAutorizzato",
      key:"cloudAuthorization",
      label:"onlyCloud"
    })
  ]
  functionLabel: any;
  constructor(
    private modalCtrl:ModalController,
    private service:FunctionsService,
    private toaster:MyToastService,
    private navParams:NavParams,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService
  ) { 
    this.translateText()
  }

  close(obj?:FunctionModel){
    this.modalCtrl.dismiss(obj)
  }
  async translateText(){
    this.submitText = await this.translate.get('editFunction').toPromise()
    this.functionLabel = await this.translate.get("function").toPromise()

  }

  async ngOnInit() {
    this.function2edit = new FunctionModel(this.navParams.data.functionItem)
    console.log("function 2 edit",this.function2edit)
    this.translate.use(this.translateConfig.currentLang)
    //
    this.function2edit.initialize(this.navParams.data.data)
    this.title = `${this.function2edit.key}`
    console.log("editing",this.function2edit)
    this.formFields = [
      new TextboxQuestion({
        label:this.functionLabel,
        key:"title",
        value:this.function2edit.title
      }),
      new TextAreaBox({
        label:"note",
        key:"note",
        value:this.function2edit.note
      }),
      new TextAreaBox({
        label:"description",
        key:"description",
        value:this.function2edit.description
      }),
      new TextboxQuestion({
        label:'icon',
      key:'icon',
      value:this.function2edit.icon}),
      new TextboxQuestion({
        label:"url's page",
        key:'url',
        value:this.function2edit.url
      }),
      new SwitchQuestion({
        labelTrue:await this.translate.get("cloudOnly").toPromise(),
        labelFalse:await this.translate.get("admin").toPromise(),
        key:"cloudAuthorization",
        label:"onlyCloud",
        iconTrue:"cloud-done",
        iconFalse:"cloud-offline",
        value:this.function2edit.cloudAuthorization
      })
    ]
    console.log("fields",this.formFields)
  }
  filter(ev){
  }
  submit(ev){
    this.function2edit.initialize(ev)
    console.log("submitting",this.function2edit)
     this.service.updateItem(this.function2edit).then(val=>{
      this.toaster.presentToast("funzione modificata correttamente")
      this.close(this.function2edit)
    }).catch(err=>{
      this.toaster.presentToast("ho riscontrato dei problemi")
      console.error(err)
    }) 
  }

}
