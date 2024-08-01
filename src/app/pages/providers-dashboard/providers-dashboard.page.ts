import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditUserPage } from 'src/app/modules/user/pages/edit-user/edit-user.page';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { OperatorViewerComponent } from 'src/app/components/viewers/operator-viewer/operator-viewer.component';
import { EditOPeratorPage } from '../Operators/edit-operator/edit-operator.page';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { ModalController } from '@ionic/angular';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { AddOperatorPage } from '../Operators/add-operator/add-operator.page';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { LocationModel } from 'src/app/models/locationModel';
import { PatientModel } from 'src/app/modules/user/models/patientModel';
import { GroupService } from 'src/app/services/groups/group.service';
import { GroupModel } from 'src/app/models/groupModel';
import { PatientViewerComponent } from 'src/app/components/viewers/patientViewer/patient-viewer/patient-viewer.component';
import { GroupViewComponent } from 'src/app/components/viewers/groupViewer/group-view/group-view.component';
import { LocationViewerComponent } from 'src/app/components/viewers/location-viewer/location-viewer.component';
import { OrderViewerComponent } from 'src/app/components/viewers/orders/order-viewer/order-viewer.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { collection, query, where, getDocs } from "firebase/firestore";
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { MyAlertService } from 'src/app/modules/helpers/services/alert/my-alert-service.service';
import { EditOrderPage } from '../orders/edit/edit-order/edit-order.page';
import { EditGroupPage } from '../groups/edit-group/edit-group.page';
import { EditLocationPage } from '../locations/edit-location/edit-location.page';
import { EditPatientPage } from '../patients/edit-patient/edit-patient.page';
import { PaginationController } from 'src/app/modules/item/business/paginationController';
@Component({
  selector: 'app-providers-dashboard',
  templateUrl: './providers-dashboard.page.html',
  styleUrls: ['./providers-dashboard.page.scss'],
})
export class ProvidersDashboardPage implements OnInit, OnDestroy {
  emptyText4orders: any;
  constructor(public functionsService: FunctionsService,
    public modalCtrl: ModalController,
    public operatorService: UsersService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    public locations: LocationsService,
    public patients: PatientsService,
    public groups: GroupService,
    private users: UsersService,
    public orders: OrdersService,
    private toaster: MyToastService,
    private alertCtrl: MyAlertService
  ) { }
  hydeAddIcon= true
$paginationController4patients:BehaviorSubject< PaginationController> = new BehaviorSubject(new PaginationController(0,(p,i)=>{},10,4,'pag','di'))
readonly paginationController4patients:Observable<PaginationController> = this.$paginationController4patients.asObservable()
$paginationController4groups:BehaviorSubject<PaginationController> = new BehaviorSubject(new PaginationController(0,(p,i)=>{},10,4,'pag','di'))
readonly paginationController4groups:Observable<PaginationController>= this.$paginationController4groups.asObservable()
$paginationController4locations:BehaviorSubject< PaginationController> = new BehaviorSubject(new PaginationController(0,(p,i)=>{},10,4,'pag','di'))
readonly paginationController4locations:Observable<PaginationController> = this.$paginationController4locations.asObservable()
$paginationController4orders:BehaviorSubject<PaginationController> = new BehaviorSubject(new PaginationController(0,(p,i)=>{},10,4,'pag','di'))
readonly paginationController4orders:Observable<PaginationController> = this.$paginationController4orders.asObservable()
  toggleMenu() {
    this.showMenu = !this.showMenu
    console.log("showMenu", this.showMenu)
  }

  titleFactory4Patients(patient:PatientModel){
    return `${patient.getDisplayName()}`
  }
  titleFactory4orders(order:OrderModel){
    return `ordine `
  }
  loggedUSer: UserModel
  patientViwerComponent = PatientViewerComponent

  groupViewerComponent = GroupViewComponent
  locationViewerComponent = LocationViewerComponent
  orderViewerComponent = OrderViewerComponent
  locationsList: LocationModel[]
  headers4Locations = ["city", "street", "number", "zipCode"]
  patientsList: PatientModel[]
  ordersList :OrderModel[]= []
  headers4Patients = ["first name", "last name", "gender", "date of birth"]
  emptyText4Patients = "empty text 4 patient"
  emptyText4Groups = "empty text 4 group"
  emptyText4Locations = "empty text 4 locations"
  title4Patients = "Pazienti"
  title4Locations = "Locations"
  title4Groups = "Groups"
  editOrderPage = EditOrderPage

  showMenu = false
  title4Orders = ""
  groupsList: GroupModel[]
  headers4Groups = ["title", "key"]
  headers4orders = ["status", "patient", "group", "location", "creation date"]
  editPage = EditOPeratorPage
  createPage = AddOperatorPage
  emptyText4patients = "non  hai operatori"
  queue = "operatori"
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
          const modal = await this.modalCtrl.create({ component: EditOPeratorPage, componentProps: { operator } })
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
  hydeFab = true
  hydePagination = false
  showAddButtonInPagination=true
  titleFactory = (item: UserModel) => {
    return `${item.fullName} ${item.email}`
  }
  itemViewerComponent = OperatorViewerComponent

  buttons4Orders = [

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (item: ItemModelInterface) => {
          console.log("editing", item)
          const modal = await this.modalCtrl.create({
            component: EditOrderPage,
            componentProps: { data: item, extra: this.loggedUSer.providerKey },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
          modal.onDidDismiss().then(async (item) => {
            if (item.data) {
              this.toaster.presentToast(await this.translate.get("updatedOrder").toPromise())

            }
          })
          await modal.present()

        },
      },
    }, {
      text: "delete",
      icon: "trash",
      data: {
        action: async (item: ItemModelInterface) => {
          this.alertCtrl.presentAlert({
            header: "alert",
            subHeader: await this.translate.get("confirmDeleteOrder").toPromise(),
            message: await this.translate.get("sei sicuro").toPromise(),
            buttons: [{
              text: await this.translate.get('yes').toPromise(),
              handler: () => {
                console.log("deleting", item.key)
                this.deleteItem(item.key)
                return true
              }
            },
            {
              text: await this.translate.get('keepit').toPromise(),
              handler: () => {
                return true
              }
            }
            ]
          },
          )
        }
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close",
      data: {
        action: (a) => {
          console.log("canceled", a)
        },
      },
    },
  ]

  buttons4Groups = [

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (item: ItemModelInterface) => {
          console.log("editing", item)
          const modal = await this.modalCtrl.create({
            component: EditGroupPage,
            componentProps: { data: item, extra: this.loggedUSer.providerKey },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
          modal.onDidDismiss().then(async (item) => {
            if (item.data) {
              this.toaster.presentToast(await this.translate.get("updatedGroup").toPromise())

            }
          })
          await modal.present()

        },
      },
    }, {
      text: "delete",
      icon: "trash",
      data: {
        action: async (item: ItemModelInterface) => {
          this.alertCtrl.presentAlert({
            header: "alert",
            subHeader: await this.translate.get("confirmDeleteOrder").toPromise(),
            message: await this.translate.get("sei sicuro").toPromise(),
            buttons: [{
              text: await this.translate.get('yes').toPromise(),
              handler: () => {
                console.log("deleting", item.key)
                this.deleteItem(item.key)
                return true
              }
            },
            {
              text: await this.translate.get('keepit').toPromise(),
              handler: () => {
                return true
              }
            }
            ]
          },
          )
        }
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close",
      data: {
        action: (a) => {
          console.log("canceled", a)
        },
      },
    },
  ]
  buttons4Locations = [

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (item: ItemModelInterface) => {
          console.log("editing", item)
          const modal = await this.modalCtrl.create({
            component: EditLocationPage,
            componentProps: { data: item, extra: this.loggedUSer.providerKey },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
          modal.onDidDismiss().then(async (item) => {
            if (item.data) {
              this.toaster.presentToast(await this.translate.get("updatedLocatiion").toPromise())

            }
          })
          await modal.present()

        },
      },
    }, {
      text: "delete",
      icon: "trash",
      data: {
        action: async (item: ItemModelInterface) => {
          this.alertCtrl.presentAlert({
            header: "alert",
            subHeader: await this.translate.get("confirmDeleteOrder").toPromise(),
            message: await this.translate.get("sei sicuro").toPromise(),
            buttons: [{
              text: await this.translate.get('yes').toPromise(),
              handler: () => {
                console.log("deleting", item.key)
                this.deleteItem(item.key)
                return true
              }
            },
            {
              text: await this.translate.get('keepit').toPromise(),
              handler: () => {
                return true
              }
            }
            ]
          },
          )
        }
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close",
      data: {
        action: (a) => {
          console.log("canceled", a)
        },
      },
    },
  ]
  buttons4Patients = [

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (item: ItemModelInterface) => {
          console.log("editing", item)
          const modal = await this.modalCtrl.create({
            component: EditPatientPage,
            componentProps: { data: item, extra: this.loggedUSer.providerKey },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
          modal.onDidDismiss().then(async (item) => {
            if (item.data) {
              this.toaster.presentToast(await this.translate.get("updatedPatient").toPromise())

            }
          })
          await modal.present()

        },
      },
    }, {
      text: "delete",
      icon: "trash",
      data: {
        action: async (item: ItemModelInterface) => {
          this.alertCtrl.presentAlert({
            header: "alert",
            subHeader: await this.translate.get("confirmDeleteOrder").toPromise(),
            message: await this.translate.get("sei sicuro").toPromise(),
            buttons: [{
              text: await this.translate.get('yes').toPromise(),
              handler: () => {
                console.log("deleting", item.key)
                this.deleteItem(item.key)
                return true
              }
            },
            {
              text: await this.translate.get('keepit').toPromise(),
              handler: () => {
                return true
              }
            }
            ]
          },
          )
        }
      }
    },
    {
      text: 'Cancel',
      role: 'cancel',
      icon: "close",
      data: {
        action: (a) => {
          console.log("canceled", a)
        },
      },
    },
  ]
  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
  listHead = "list header"
  subscription = new Subscription()
  async ngOnInit() {
    this.paginationController4orders.subscribe(p=>{
      console.log("paginator order",p)
    })
    this.loggedUSer = await this.users.fetchLoggedUser()
    this.translate.use(this.translateConfig.currentLang)
    this.title4Orders = await this.translate.get("orders").toPromise()
    this.emptyText4Groups = await this.translate.get("emptytext4group").toPromise()
    this.emptyText4Patients = await this.translate.get("emptytext4Patients").toPromise()
    this.emptyText4Locations = await this.translate.get("emptytext4Locations").toPromise()
    this.emptyText4orders = await this.translate.get("emptyText4Orders").toPromise()
    this.patients.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey, async (data: { data: PatientModel[], total: number }) => {
      const paginator4patients = new PaginationController(0,
        (page:number,item4page:number)=>{

          this.patients.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey,async (data:{data:PatientModel[],total:number})=>{
            this.patients.publish(data.data)
          },undefined,{page:page,items4page:item4page})
        },data.total,2,
        await this.translate.get('page').toPromise(),await  this.translate.get('di').toPromise())
        this.$paginationController4patients.next(paginator4patients)
      this.patients.publish(data.data)
      this.patientsList = data.data
    })
    console.log("paginator",this.paginationController4patients)
    this.locations.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey, async (data: { data: LocationModel[], total: number }) => {
      this.locations.publish(data.data)
      this.locationsList = data.data
      const paginator4locations = new PaginationController(0,(page:number,items4page:number)=>{
   this.locations.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey,async (data:{data:LocationModel[],total:number})=>{
    this.locations.publish(data.data)
    this.locationsList = data.data
        },undefined,{page:page,items4page:items4page})
      },
      data.total,2,await this.translate.get('page').toPromise(),await this.translate.get('di').toPromise())
      this.$paginationController4locations.next(paginator4locations)
    })
    this.groups.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey, async (result: { data: GroupModel[], total: number }) => {
      this.groups.publish(result.data)
      this.groupsList = result.data
      const paginationController4groups = new PaginationController(0,(page,items4page)=>{
        this.groups.realtimeFetchItemsFromSubCollection(this.loggedUSer.providerKey,(result:{data:GroupModel[],total:number})=>{
          this.groups.publish(result.data)
        },undefined,{page,items4page})
      },
      result.total,2,
      await this.translate.get('page').toPromise(),
      await this.translate.get('di').toPromise())
      this.$paginationController4groups.next(paginationController4groups)
    const query = where("providerKey", "==", this.loggedUSer.providerKey);
    const ordersCallBack = async (result: { data: OrderModel[], total: number }) => {
      console.log("publishing orders",result)
      this.orders.publish(result.data)
      const paginationController4orders = new PaginationController(0,(page:number,items4paage)=>{
        const query = where("providerKey", "==", this.loggedUSer.providerKey);
        const ordersCallBack = async (result:{data:OrderModel[],total:number})=>{
          this.orders.publish(result.data)
          this.ordersList=result.data
        }
        this.orders.realTimeFetchItem({
          page:page,
          limit:items4paage,
          callBack:ordersCallBack,
          onError:(error)=>{
            console.error(error)
          },
          query2apply:query
        })
      },
      result.total,2,await this.translate.get("page").toPromise(),
      await this.translate.get('di').toPromise())
      this.$paginationController4orders.next(paginationController4orders)
    }
    const ordersOnErrors = (error) => {
      console.error(error)
    }
    this.orders.realTimeFetchItem({
      page:0,
      limit:2,
      callBack: ordersCallBack,
      onError: ordersOnErrors,
      query2apply: query
    })
    this.subscription.add(this.translate.onLangChange.subscribe(async () => {
      this.emptyText4patients = await this.translate.get("noPatients").toPromise()
    }))
    const companyKey = (await this.operatorService.fetchLoggedUser()).key
    this.functionsService.publish(await this.functionsService.fetchItems())
  })
}
  deleteItem(ev) {
    console.log("deleting  item", ev)
  }

}
