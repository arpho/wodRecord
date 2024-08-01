import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/Customer';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NewCustomerPage } from '../../create/new-customer/new-customer.page';
import { UpdateCustomerPage } from '../../edit/update-customer/update-customer.page';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { CustomersService } from 'src/app/services/customers/customers-service.service';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { RequestsPage } from 'src/app/pages/modal/requests/requests.page';
import { PlantarsPage } from 'src/app/pages/modal/plantars/plantars.page';
import { UserViewerComponent } from 'src/app/modules/user/components/viewers/user-viewer/user-viewer.component';
import { CustomerViewerComponent } from 'src/app/components/viewers/customer-viewer/customer-viewer.component';
import { OperatorViewerComponent } from 'src/app/components/viewers/operator-viewer/operator-viewer.component';
import { EditUserPage } from 'src/app/modules/user/pages/edit-user/edit-user.page';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  editModalPage = UpdateCustomerPage
  emptyText = "non ci sono utenti ancora"
  headers = ["nome", "cognome", "email"]
  hydeFab = true
  subscription = new Subscription()
  hydePagination = false
  createModalPage = NewCustomerPage
  itemViewerComponent = OperatorViewerComponent//CustomerViewerComponent
  icon4quickFunction = "file-tray-full-outline"
  titleFactory = (item: ItemModelInterface) => {
    return "titleFactory to be implemented"
  }
  listHead = ""
  quickFunction = async (key: string) => {

    const modal = await this.modalCtrl.create({ component: PlantarsPage, componentProps: { userKey: key } })
    modal.present()
  }

  buttons = [
    {
      text: 'Delete',
      role: 'destructive',
      icon: "trash",
      data: {
        action: 'delete',
      },
    },

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (operator: ItemModelInterface) => {
          const modal = await this.modalCtrl.create({ component: UpdateCustomerPage, componentProps: { item: operator },cssClass:'fullscreen'})
          await modal.present()

        },
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close",
      data: {
        action: (a) => {
          console.log("action canceled", a)
        },
      },
    },
  ]

  filterFunction(customer: Customer) {
    return true
  }

  filterFields = [
    new TextboxQuestion({
      key: "nome",
      label: "filtra per nome",
      filterFunction: (value: string, customer: Customer) => customer.
        firstName.trim().toUpperCase().includes(value.trim().toUpperCase())
    }),
    new TextboxQuestion({
      key: "surname",
      label: "filtra per cognome",
      filterFunction: (value: string, customer: Customer) => customer.
        lastName.trim().toUpperCase().includes(value.trim().toUpperCase())
    }),
    new TextboxQuestion({
      key: "email",
      label: "filtra per email",
      filterFunction: (value: string, customer: Customer) => customer.
        email.trim().toLowerCase().includes(value.trim().toLowerCase())
    })
  ]

  constructor(
    public service: UsersService,
    private translateConfigService: TranslateConfigService,
    private actionSheetController: ActionSheetController,
    private translate: TranslateService,
    private modalCtrl: ModalController
  ) {
  }
  async ngAfterViewInit(): Promise<void> {
    const handler = (customers: CustomerModel[]) => {
      this.service.publish(customers)
    }
    this.service.fetchRealTimeCustomers(handler,/* {field:'email',condition:'==',value:'pippo'} */)
  }

  async ngOnInit() {
    this.translate.use(this.translateConfigService.currentLang)
    const callback = function (data) {
    }
    const loggedUser = await this.service.fetchLoggedUser();
    if (loggedUser.isEnabledToUse("Sq8gJkvGKrDoTpoc4DLb"))
      this.buttons.push({
        text: await this.translate.get("seePlantars").toPromise(),
        icon: "sparkles", data: {
          action: async (user: UserModel) => {
            const modal = await this.modalCtrl.create({ component: PlantarsPage, componentProps: { item: user } })
            await modal.present()
          }
        }
      })
    this.subscription.add(this.translate.onLangChange.subscribe(async () => {
      this.listHead = await this.translate.get("operators").toPromise()
    }))
    this.subscription.add(this.service.items.subscribe(callback))
  }
  page = 0
  limit = 10
  navigationText = ""


  move2nextPage() {
    console.log("next page", this.page)
    this.page += 1
    console.log("next", this.page)
    this.service.realtimeFetchItems((auth:{data:UserModel[],total:number}) => this.service.publish(auth.data), this.page, this.limit)
    this.setNavigationText(this.page)
  }
  move2previousPage() {
    console.log("go to previous page")
    if (this.page >= 1) {
      this.page -= 1
      this.service.realtimeFetchItems((auth:{data:UserModel[],total:number}) => this.service.publish(auth.data), this.page, this.limit)

      console.log("go to previous page", this.page)
      this.setNavigationText(this.page)
    }
  }
  setNavigationText(page: number) {
    this.navigationText = this.translate.instant("pagination", { page: page + 1 })
  }
  addDays2Date(startingDate: Date, days: number) {
    const daymsec = 60 * 1000 * 60 * 24
    return new Date(startingDate.getTime() + days * daymsec)
  }



  expiringCustomers() {
    const today = new Date()
    const expirationDate = this.addDays2Date(today, 31)
    this.filterFunction = (customer: Customer) => customer.expirationTime < expirationDate.getTime()

  }

  setFilter(ev: (item: ItemModelInterface) => boolean) {
    this.filterFunction = ev
  }



}
