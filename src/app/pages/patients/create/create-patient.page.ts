import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TextField, TextareaAutosize } from '@material-ui/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePatientPage implements OnInit {
  [x: string]: any;
  submitText = "inserisci nuovo paziente"
  patient: PatientModel = new PatientModel()
  providerKey:string


  constructor(
    private service: PatientsService,
    private modalCtrl: ModalController,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private toaster:MyToastService,
    private navParams:NavParams,
    private users: UsersService) { }

  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    this.providerKey = this.navParams.data.data4Modal
    console.log("param",this.providerKey)
    this.formFields = [
      new TextboxQuestion({
        key: 'firstName',
        label: await this.translate.get('firstName').toPromise(),
      }),
      new TextboxQuestion({
        key: 'lastName',
        label: await this.translate.get('lastName').toPromise()
      }),
      new TextboxQuestion({
        key: 'height',
        label: await this.translate.get('height').toPromise(),
        type: 'number'
      }),
      new TextboxQuestion({
        label: await this.translate.get('weight').toPromise(),
        type: 'number',
        key: 'weight'
      }),
      new TextboxQuestion({
        key: 'gender',
        label: await this.translate.get('sex').toPromise()
      }),
      new TextAreaBox({
        key: 'note',
        label: await this.translate.get('note').toPromise()
      }),
      new DateQuestion({
        key: 'birthDate',
        label: await this.translate.get('dob').toPromise(),
        presentation: 'date'
      })
    ]
  }
  formFields: any[]
  filter(ev) {
    console.log("typing", ev)
  }

  dismiss(patient?: PatientModel) {
    this.modalCtrl.dismiss(patient)
  }
  async submit(ev) {
    const user = await this.users.fetchLoggedUser()
    this.patient.build(ev)
    console.log("creating",this.patient)
    this.service.createItem(this.patient, this.providerKey).then(async v=>{
      this.patient.key= v.id
      this.toaster.presentToast(await this.translate.get("okPatient").toPromise() )
    }).catch(async error=>{
      this.toaster.presentToast(await this.translate.get("troublePatient").toPromise())
      console.error(error)
    }).finally(()=>{
    this.dismiss(this.patient)
    })

  }


}
