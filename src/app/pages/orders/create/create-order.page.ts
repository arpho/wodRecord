import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GroupModel } from 'src/app/models/groupModel';
import { LocationModel } from 'src/app/models/locationModel';
import { OptionsMaker } from 'src/app/modules/dynamic-form/helpers/optionMaker';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { ProductType } from 'src/app/modules/user/models/product_type';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { GroupService } from 'src/app/services/groups/group.service';
import { KempelenService } from 'src/app/services/kempelen/kempelen-service.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { CreateLocationPage } from '../../locations/create-location/create-location.page';
import { CreateGroupPage } from '../../groups/create-group/create-group.page';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { CreatePatientPage } from '../../patients/create/create-patient.page';
import { error } from 'console';
import { OrderStatus } from 'src/app/modules/user/models/orderStatus';

@Component({
  selector: 'app-create-order',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreateOrderPage implements OnInit {
  formFields: any[]
  constructor(
    private modalCtrl: ModalController,
    private service: OrdersService,
    private kempelen: KempelenService,
    private patients: PatientsService,
    private auth: AuthService,
    private toaster: MyToastService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private users: UsersService,
    public groups: GroupService,
    public locations: LocationsService
  ) { }
  submitText = ""
  loggedUser: UserModel
  submit(ev) {
    const order = new OrderModel(ev)
    order.locationKey = order.location.key
    order.providerKey = this.loggedUser.providerKey
    order.groupKey = order.group.key
    order.patientKey = order.patient.key
    console.log("submitting order", order)
    this.service.createItem(order).then(async v => {
      order.key = v.id
      this.toaster.presentToast(await this.translate.get("okOrder").toPromise())
      this.dismiss(order)
    }).catch(async error => {
      this.toaster.presentToast(await this.translate.get("troubleOrder").toPromise())
      console.error(error)
      this.dismiss()
    })
  }
  filter(ev) {
    console.log("typing", ev)
  }
  fileName = ""
  showSpinner = false
  fileContent: any
  async ngOnInit() {
    this.loggedUser = await this.users.fetchLoggedUser()
    console.log("loggedUser", this.loggedUser)
    try {
      this.locations.realtimeFetchItemsFromSubCollection(this.loggedUser.providerKey, (response: { data: LocationModel[], total: number }) => {
        console.log("got locations", response)
        this.locations.publish(response.data)
        this.patients.realtimeFetchItemsFromSubCollection(this.loggedUser.providerKey, (response: { data: PatientModel[], total: number }) => {
          this.patients.publish(response.data)
        })
      })
      const handler = (result: { data: GroupModel[], total: number }) => {
        this.groups.publish(result.data)

      }
      this.groups.realtimeFetchItemsFromSubCollection(this.loggedUser.providerKey, handler)
    }
    catch (error) {
      console.error(error)
    }
    this.translate.use(this.translateConfig.currentLang)
    this.submitText = await this.translate.get("submitOrder").toPromise()
    this.formFields = [
      new DropdownQuestion({
        key: "status",
        label: "order Status",
        options: new OptionsMaker().makesOptionsFromEnum(OrderStatus)
      }),
      new DropdownQuestion({
        key: "product_type",
        label: "product type",
        order: 0,
        options: new OptionsMaker().makesOptionsFromEnum(ProductType)
      }),
      new TextboxQuestion({
        order: 1,
        key: 'left_size',
        label: "left size",
        type: "number"
      }),
      new TextboxQuestion({
        order: 2,
        key: 'right_size',
        label: "right size",
        type: "number"
      }),
      new SwitchQuestion({
        key: "milledOr3DPrinted",
        label: "milled or 3D printed",
        labelTrue: 'Milled',
        labelFalse: "3D"
      }),
      new DateQuestion({
        key: 'date_created',
        label: "creation date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_checked',
        label: "checking  date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_shippered',
        label: "shippered date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_order',
        label: "order date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_produced',
        label: "production date",
        presentation: "date"
      }),
      new SelectorQuestion({
        key: "location",
        label: "Location",
        service: this.locations,
        text: "select a location",
        createPopup: CreateLocationPage,
        data4Modal: this.loggedUser.providerKey
      }),
      new SelectorQuestion({
        key: "group",
        label: "Group",
        service: this.groups,
        text: "select a group",
        createPopup: CreateGroupPage,
        data4Modal: this.loggedUser.providerKey
      }),
      new SelectorQuestion({
        key: "patient",
        label: "Patient",
        service: this.patients,
        text: "select a patient",
        createPopup: CreatePatientPage,
        data4Modal: this.loggedUser.providerKey
      })
    ]
  }

  handleUpload(ev) {
    console.log("uploading", ev)
  }

  public onChange(fileList: FileList): void {
    console.log("loading ", fileList)
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    console.log("ecco il file", file.arrayBuffer)
    fileReader.onload = function (event) {
    }
    fileReader.onloadend = async (x) => {
      this.showSpinner = true
      console.log("x", x.currentTarget['result'])
      /* const modal = await this.modalCtrl.create({component:StlViewerPage,componentProps:{model:x.currentTarget['result']}})
      modal.present()  */
      this.fileContent = fileReader.result;
      const token = await this.auth.getPromisedToken()
      console.log("token", token)
      let assetData = new FormData()
      console.log("aset data")
      assetData.append('asset_upload', file, file.name)
      this.kempelen.uploadAsset(token, assetData).subscribe(res => {
        this.showSpinner = false
        console.log("got response", res)
      }, (error) => {
        this.showSpinner = false
        this.toaster.presentToast("non va " + error.error, "top", 2000)
        console.log(error)
      })
      //console.log("file content",this.fileContent)
      fileReader.onload = async ev => {
        console.log("loaded", ev.target)
      }


    }

    fileReader.addEventListener('load', e => {
      // Getting the File from our Map by the FileReader reference:
      //const file = files.get(e.target);
      const files = new Map()
      this.fileName = file.name
      console.log(`The contents of ${file.name}:`);
      console.log("ciao file", file)
      //console.log(e.target.result);

      // We no longer need our File reference:
      //files.delete(e.target);
    });
    fileReader.readAsArrayBuffer(file);
  }


  dismiss(order?: OrderModel) {
    this.modalCtrl.dismiss(order)
  }


}
