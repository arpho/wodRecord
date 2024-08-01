import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { error } from 'console';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { CreateOrderPage } from '../../orders/create/create-order.page';
import { UpdateOrderPage } from '../../orders/update/update-order.page';
import { OrderComponent } from 'src/app/components/order-component/order-component.component';
import { OrderModel } from 'src/app/modules/user/models/orderModel';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePatientPage implements OnInit {
patient:PatientModel = new PatientModel()
  constructor(
    private toaster:MyToastService,
    private service:PatientsService,
    private users:UsersService,
    private navParams:NavParams,
    private modalCtrl:ModalController) { }
    i_tab = 't2';
  title =""
  submitText= ""

  itemViewerComponent = OrderComponent
  user: UserModel = new UserModel()
  itemsList: OrderModel[] = []
  createPage =CreateOrderPage
  editPage = UpdateOrderPage
  listHead ="Ordini"
    formFields = []
    filter(ev){
      console.log("typing",ev)
    }

 setTitle(tab?:any){
  this.title = (this.i_tab=='t2')?`visualizza paziente ${this.patient?.fullName}`:`modifica paziente ${this.patient?.fullName}`
 }

  ngOnInit() {
    this.patient = this.navParams.data.data
    console.log("got patient",this.patient)
    this.setTitle(this.i_tab)
    this.formFields = [
      new TextboxQuestion({
        key:'firstName',
        value:this.patient?.firstName,
        label:"nome",
      }),
      new TextboxQuestion({
        key:'lastName',
        value:this.patient?.lastName,
        label:"cognome"
      }),
      new TextboxQuestion({
        key:'height',
        value:this.patient?.height,
        label:'altezza',
        type:'number'
      }),
      new TextboxQuestion({
        label:'peso',
        type:'number',
        value:this.patient?.weight,
        key:'weight'
      }),
      new TextboxQuestion({
        key:'sex',
        value:this.patient?.gender,
        label:'sesso'
      }),
      new TextAreaBox({
        key:'note',
        value:this.patient?.note,
        label:'note'
      }),
      new DateQuestion({
        key:'birthDate',
        value:this.patient?.birthDate,
        label:'data di nascita',
        presentation:'date'
      })
    ]
  }


  async submit(ev){
    const user = await this.users.fetchLoggedUser()
    this.patient.build(ev)
    console.log('submitting',this.patient)
    this.service.updateItem(this.patient,user.key).then(val=>{
      this.toaster.presentToast(`Il paziente ${this.patient?.fullName} è stato aggiornato correttamente`).catch(error=>{
        this.toaster.presentToast("ho risontrato dei problemi")
        console.error(error)
      }).finally(()=>{
        this.dismiss(this.patient)
      })
    })

  }

  dismiss(patient?:PatientModel) {
    this.modalCtrl.dismiss(patient)
  }

}
