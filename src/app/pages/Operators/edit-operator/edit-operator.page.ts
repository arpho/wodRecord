import { Component, OnInit } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { EnabledFunctionsQuestion } from 'src/app/modules/dynamic-form/models/enabledFunctionsQuestion';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { UserModel } from 'src/app/modules/user/models/userModel';

@Component({
  selector: 'app-edit-operator',
  templateUrl: './edit-operator.page.html',
  styleUrls: ['./edit-operator.page.scss'],
})
export class EditOPeratorPage implements OnInit {
submitText="modifica Operatore"
  constructor(private navParams:NavParams,
    private translate:TranslateService
  ) { }
operator:UserModel

  formFields = []
  filter(ev){
    console.log("typing",ev)
  }
  submit(ev){
    console.log("submit",ev)
  }
                                              
  async ngOnInit() {
    this.operator =this.navParams.data.operator
    console.log("data0",this.operator )
    this.formFields = [
    new TextboxQuestion({
      key: "firstName",
      label: await this.translate.get('firstName')?.toPromise(),
      value: this.operator?.firstName,
      required: true
    }),
    new TextboxQuestion({
      key: "enabledFunctions",
      value: this.operator?.lastName,
      label: await this.translate.get('lastName')?.toPromise()
    }),
  new EmailQuestion({
    key:"email",
    label:"email",
    value:this.operator.email,
    disabled:true
  })]
  }

}
