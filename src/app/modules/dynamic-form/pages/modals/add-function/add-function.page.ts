import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FunctionModel } from 'src/app/models/functionModel';
import { QuestionBase } from '../../../models/question-base';
import { DateQuestion } from '../../../models/question-date';
import { SelectorQuestion } from '../../../models/question-selector';
import { TextboxQuestion } from '../../../models/question-textbox';
import { CreateFunctionsPage } from 'src/app/pages/functions/create-functions/create-functions.page';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-add-function',
  templateUrl: './add-function.page.html',
  styleUrls: ['./add-function.page.scss'],
})
export class AddFunctionPage implements OnInit {


  isKarma = ()=>{return document.getElementsByTagName("title")[0].innerHTML === 'Karma';}
  result: { enabledFunction: FunctionModel, endTime: number }
  submit(ev: {}) {
    const minute = 1000 * 60;
    const hour = minute * 60
    const day = hour * 24
    const date = new Date(ev['endTime'] ? ev['endTime'] : new Date(new Date().getTime() + 30 * day).toISOString())/* se non viene inseri ta una data  per default viene fissata a un
                                                                                                           mese dopo la data odierna*/
    this.result = {
      enabledFunction: ev['enabledFunction'],
      endTime: date.getTime()
    }
    this.dismiss(this.result)
  }
  filter(ev: {}) {
  }
  formFields: QuestionBase<any>[] = [

    new SelectorQuestion({
      key: "enabledFunction",
      label: "seleziona la funzione da abilitare",
      service: !this.isKarma()? this.functionService:undefined,
      text: "una funzione",
      createPopup: CreateFunctionsPage
    }),
    new DateQuestion({
      key: "endTime",
      label: "data di scadenza",
      presentation: 'date'
    })
  ]

  constructor(
    private modalCtrl: ModalController,
    public functionService: FunctionsService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService

  ) { }
  dismiss(value?) {
    this.modalCtrl.dismiss(value)
  }

  async ngOnInit() {
    const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
    console.log("## iskarma",isKarma)
    const selectionText = await this.translate.get('selectFunction').toPromise()
    const oneFunction = await this.translate.get('oneFunction').toPromise()
    const expirationTime = await this.translate.get('expirationTime').toPromise()
    this.translate.use(this.translateConfig.currentLang)
    this.formFields = [

      new SelectorQuestion({
        key: "enabledFunction",
        label: selectionText,
        service: !isKarma?this.functionService:undefined,
        text: oneFunction,
        createPopup: CreateFunctionsPage
      }),
      new DateQuestion({
        key: "endTime",
        label: expirationTime
      })
    ]
  }

}
