import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { OptionsMaker } from 'src/app/modules/dynamic-form/helpers/optionMaker';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { SelectorQuestion } from 'src/app/modules/dynamic-form/models/question-selector';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { serviceMocker } from 'src/app/modules/item/mockers/serviceMocker';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { OrderStatus } from 'src/app/modules/user/models/orderStatus';
import { ProductType } from 'src/app/modules/user/models/product_type';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { CreateGroupPage } from 'src/app/pages/groups/create-group/create-group.page';
import { CreateLocationPage } from 'src/app/pages/locations/create-location/create-location.page';
import { CreatePatientPage } from 'src/app/pages/patients/create/create-patient.page';
import { GroupService } from 'src/app/services/groups/group.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public locations: LocationsService,
    public groups: GroupService,
    public patients: PatientsService,
    private users: UsersService,
    private service: OrdersService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private toaster: MyToastService
  ) { }
  loggedUser: UserModel
  order: OrderModel
  formFields = []
submitText=""
  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    console.log("navParams.data.data",this.navParams.data.data)
    this.order = new OrderModel(this.navParams.data.data)
    console.log("order",this.order)
    console.log("provider key from order",this.order.providerKey)
    const group = await this.groups.getItemFromSubcollection(this.order.providerKey, this.order.groupKey)
    this.order.group = group
    const location = await this.locations.getItemFromSubcollection(this.order.providerKey, this.order.locationKey)
    this.order.location = location
    const patient = await this.patients.getItemFromSubcollection(this.order.providerKey, this.order.patientKey)
    this.order.patient = patient
    this.loggedUser = await this.users.fetchLoggedUser()
    this.submitText = await this.translate.get("updateorder").toPromise()

    //load and publish data to service data for services 
    this.locations.publish(await this.locations.fetchItems(this.order.providerKey))
    this.groups.publish(await this.groups.fetchItems(this.order.providerKey))
    this.patients.publish(await this.patients.fetchItems(this.order.providerKey))
    this.formFields = [
      new DropdownQuestion({
        key: "status",
        value: this.order.status,
        label: "order Status",
        options: new OptionsMaker().makesOptionsFromEnum(OrderStatus)
      }),
      new DropdownQuestion({
        key: "product_type",
        label: "product type",
        order: 0,
        value: this.order.product_type,
        options: new OptionsMaker().makesOptionsFromEnum(ProductType)
      }),
      new TextboxQuestion({
        order: 1,
        value: this.order.left_size,
        key: 'left_size',
        label: "left size",
        type: "number"
      }),
      new TextboxQuestion({
        order: 2,
        value: this.order.right_size,
        key: 'right_size',
        label: "right size",
        type: "number"
      }),
      new SwitchQuestion({
        key: "milledOr3DPrinted",
        label: "milled or 3D printed",
        labelTrue: 'Milled',
        value: this.order.milledOr3DPrinted,
        labelFalse: "3D"
      }),
      new DateQuestion({
        key: 'date_created',
        label: "creation date",
        value: this.order.date_created.formatFullDate(),
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_checked',
        label: "checking  date",
        value: this.order.date_checked.formatFullDate(),
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_shippered',
        value: this.order.date_shippered.formatFullDate(),
        label: "shippered date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_order',
        value: this.order.date_order.formatFullDate(),
        label: "order date",
        presentation: "date"
      }),
      new DateQuestion({
        key: 'date_produced',
        value: this.order.date_produced.formatFullDate(),
        label: "production date",
        presentation: "date"
      }),
      new SelectorQuestion({
        key: "location",
        label: "Location",
        service: this.locations,
        value: this.order.location,
        text: "select a location",
        createPopup: CreateLocationPage,
        data4Modal: this.loggedUser.providerKey
      }),
      new SelectorQuestion({
        key: "group",
        label: "Group",
        service: this.groups,
        value: this.order.group,
        text: "select a group",
        createPopup: CreateGroupPage,
        data4Modal: this.loggedUser.providerKey
      }),
      new SelectorQuestion({
        key: "patient",
        label: "Patient",
        value: this.order.patient,
        service: this.patients,
        text: "select a patient",
        createPopup: CreatePatientPage,
        data4Modal: this.loggedUser.providerKey
      })
    ]
  }

  dismiss(order?: OrderModel) {
    this.modalCtrl.dismiss(order)
  }

  filter(ev) {
    console.log("typing", ev)
  }
  submit(ev) {
    this.order.initialize(ev)
    this.service.updateItem(this.order).then(async v => {
      this.toaster.presentToast(await this.translate.get("updatedOrderOk").toPromise())
      this.dismiss(this.order)
    }).catch(async error => {
      this.toaster.presentToast(await this.translate.use("UpdatedOrderKo").toPromise())
      console.error(error)
      this.dismiss()
    })
  }

}
