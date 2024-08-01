import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OrderComponent } from 'src/app/components/order-component/order-component.component';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { TextAreaBox } from 'src/app/modules/dynamic-form/models/question-textArea';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { CreateOrderPage } from '../../orders/create/create-order.page';
import { UpdateOrderPage } from '../../orders/update/update-order.page';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.page.html',
  styleUrls: ['./edit-patient.page.scss'],
})
export class EditPatientPage implements OnInit {
  title="edit paziente"
  status :boolean= false
  patient:PatientModel
  titleFactory= (item:PatientModel)=>{
    return `${item.displayName}`
  }
  formFields: any[]= [];
  submitText="modifica paziente"
  itemViewerComponent = OrderComponent
  user: UserModel = new UserModel()
  itemsList: OrderModel[] = []
  createPage =CreateOrderPage
  editPage = UpdateOrderPage
  providerKey:string
  listHead ="Ordini"

   
  

  constructor(
    private modalCtrl:ModalController,
    private toaster:MyToastService,
    private service:PatientsService,
    private orders:OrdersService,
    private users:UsersService,
    private navParams:NavParams,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService,
  ) { }

  deleteItem(item){
    console.log("deleting",item)
  }
  changeStatus(ev){
    this.status= ev.detail.checked
    console.log("status",this.status,ev.detail.checked)
    this.setTitle(this.status)
  }

  filter(ev){
    console.log("typing",ev)
  }


  async submit(ev){
    const user = await this.users.fetchLoggedUser()
    this.patient.build(ev)
    console.log('submitting',this.patient)
    this.service.updateItem(this.patient,this.providerKey).then(val=>{
      this.toaster.presentToast(`Il paziente ${this.patient.fullName} è stato aggiornato correttamente`).catch(error=>{
        this.toaster.presentToast("ho risontrato dei problemi")
        console.error(error)
      }).finally(()=>{
        this.dismiss(this.patient)
      })
    })
    
  }
 
  
  async  ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    this.providerKey = this.navParams.data.extra
    console.log("providerKey",this.providerKey)
    const firstNameKey =await  this.translate.get("firstName").toPromise()
    const lastNameKey = await this.translate.get("lastName").toPromise()
    const sexKey = await this.translate.get("sex").toPromise()
    const noteKey = await this.translate.get("note").toPromise()
    const dobKey= await this.translate.get('dob').toPromise()
    const heightKey = await this.translate.get('height').toPromise()
    const weightKey = await this.translate.get('weight').toPromise()
    this.submitText = await this.translate.get('updatePatient').toPromise()
      this.patient = this.navParams.data.data
      this.setTitle(this.status)
      this.formFields = [
        new TextboxQuestion({
          key:'firstName',
          value:this.patient?.firstName,
          label:firstNameKey,
        }),
        new TextboxQuestion({
          key:'lastName',
          value:this.patient?.lastName,
          label:lastNameKey
        }),
        new TextboxQuestion({
          key:'height',
          value:this.patient?.height,
          label:'altezza',
          type:'number'
        }),
        new TextboxQuestion({
          label:weightKey,
          type:'number',
          value:this.patient?.weight,
          key:'weight'
        }),
        new TextboxQuestion({
          key:'gender',
          value:this.patient?.gender,
          label:sexKey
        }),
        new TextAreaBox({
          key:'note',
          value:this.patient?.note,
          label:noteKey
        }),
        new DateQuestion({
          key:'birthDate',
          value:this.patient?.birthDate,
          label:dobKey,
          presentation:'date'
        })
      ]
      const user = await this.users.fetchLoggedUser()
      const ordersHandler = (orders:OrderModel[])=>{
        //this.itemsList= orders
      }
      this.orders.realTimeFetchAllOrders4Patient(this.patient.key,user.key,ordersHandler)
  }

  dismiss(patient?:PatientModel) {
    this.modalCtrl.dismiss(patient)
  }



    
 async setTitle(tab?:any){
  const viewPatientKey = await this.translate.get('viewPatient').toPromise()
  const editPatientKey = await this.translate.get("updatePatient").toPromise()
  this.title = (!this.status)?`${viewPatientKey} ${this.patient?.fullName}`:`${editPatientKey} ${this.patient?.fullName}`
 }

}
