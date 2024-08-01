import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FunctionModel } from 'src/app/models/functionModel';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';

@Component({
  selector: 'app-create-functions',
  templateUrl: './create-functions.page.html',
  styleUrls: ['./create-functions.page.scss'],
})
export class CreateFunctionsPage implements OnInit {
  submitText = "crea funzionalità"
  Function= new FunctionModel()

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
    key:'icon'}),
    new TextboxQuestion({
      label:"url's page",
      key:'url'
    })
  ]

  constructor(
    private service:FunctionsService,
    private toaster:MyToastService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
    console.log("iskarma",isKarma)
  }

  close(val?){
    this.modalCtrl.dismiss(val)
  }

  filter(ev){
    console.log("typing",ev)
  }

 async submit( ev){
    console.log("submitting",ev)
    this.Function.initialize(ev)
    console.log(" new function",this.Function)
    this.service.createItem(this.Function).then((res)=>{
      console.log("result",res)
      this.toaster.presentToast("funzione inserita correttamente")
      this.close(this.Function)

    }).catch(err=>{
      this.toaster.presentToast("ho riscontrato dei problemi")
      console.error(err)
      this.close()
    })// non uso finally perchè se in caso di errore ritornerei un oggetto  senza corrispondente sullo store
  }


}
