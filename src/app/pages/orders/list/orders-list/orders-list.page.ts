import { Component, OnInit } from '@angular/core';
import { EditOrderPage } from '../../edit/edit-order/edit-order.page';
import { CreateOrderPage } from '../../create/create-order.page';
import { OrderViewerComponent } from 'src/app/components/viewers/orders/order-viewer/order-viewer.component';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { collection, query, where, getDocs } from "firebase/firestore";
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ModalController } from '@ionic/angular';
import { MyAlertService } from 'src/app/modules/helpers/services/alert/my-alert-service.service';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { error } from 'console';
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.page.html',
  styleUrls: ['./orders-list.page.scss'],
})
export class OrdersListPage implements OnInit {

  constructor(
    public service: OrdersService,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private providers: ProvidersService,
    private users: UsersService,
    private modalCtrl: ModalController,
    public alertCtrl: MyAlertService,
    private toaster: MyToastService
  ) { }
  editPage = EditOrderPage
  navigationText = ""
  page = 0
  totalOrder = 0
  limit = 10
  createPage = CreateOrderPage
  itemViewerComponent = OrderViewerComponent
  headers = ["status", "patient", "group", "location", "creation date"]
  emptyText = "non è presente nessun ordine"
  loggedUser
  deleteItem(key: any) {
    this.service.deleteItem(key).then(async v => {
      console.info("deleted", v)
      this.toaster.presentToast(await this.translate.get("deletedOrderOk").toPromise())

    }).catch(async error => {
      console.error(error)
      this.toaster.presentToast(await this.translate.get("deleteOrderKo").toPromise())
    })
  }
  titleFactory(item: OrderModel) {
    return `order ${item.key} created at :${item.date_created.formatDate()}`
  }
  hydeFab = false
  buttons = [
    {
      text: 'Delete',
      role: 'destructive',
      icon: "trash",
      data: {
        action: async (order: OrderModel) => {
          console.log("order to delete", order)
          this.alertCtrl.presentAlert({
            header: "confirm", subHeader: "Delete order", message: `are you sure to delete:${order.key}`,
            buttons: [{
              text: await this.translate.get('yes').toPromise(),
              handler: () => {
                console.log("deleting", order.key)
                this.deleteItem(order.key)
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
          })
        },
      },
    },

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (order: OrderModel) => {
          const modal = await this.modalCtrl.create({ component: EditOrderPage, componentProps: { item: order } })
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
  async ngOnInit() {
    this.loggedUser = await this.users.fetchLoggedUser()
    const provider = await this.providers.getItem(this.loggedUser.providerKey)
    console.log("provider", provider)
    this.translate.use(this.translateConfig.currentLang)
    this.emptyText = await this.translate.get("noorders", { displayName: provider.denominazione }).toPromise()
    console.log("logged user", this.loggedUser)
    const query = where("providerKey", "==", this.loggedUser.providerKey);
    this.service.realTimeFetchItem({
      callBack: (result: { data: OrderModel[], total: number }) => {
        this.service.publish(result.data)
        this.totalOrder = result.total
        this.setNavigationText(this.page)
      }, page: this.page, query2apply: query, limit: this.limit, onError: (error) => {
        console.error(error)
      }
    })
  }


  async move2nextPage() {
    console.log("next page", this.page, this.totalOrder / this.limit, this.totalOrder)
    if ((this.page + 1) * this.limit < this.totalOrder % this.limit) {
      this.page += 1
      console.log("next", this.page)
      this.service.realTimeFetchItem({
        callBack: (result: { data: OrderModel[], total: number }) => this.service.publish(result.data), page: this.page, limit: this.limit, onError: (error) => {
          console.error(error)
        }
      })
      this.setNavigationText(this.page)
    }
    else {
      this.toaster.presentToast(await this.translate.get("nomorepages").toPromise())
    }
  }
  move2previousPage() {
    console.log("go to previous page")
    if (this.page >= 1) {
      this.page -= 1
      this.service.realTimeFetchItem({
        callBack: (result: { data: OrderModel[], total: number }) => this.service.publish(result.data), page: this.page, limit: this.limit, onError: (error) => {
          console.error(error)
        }
      })
      console.log("go to previous page", this.page)
      this.setNavigationText(this.page)
    }
  }
  move2firstPage() {
    this.page = 0
    this.service.realTimeFetchItem({
      callBack: (result: { data: OrderModel[], total: number }) => this.service.publish(result.data), page: this.page, limit: this.limit, onError: (error) => {
        console.error(error)
      }
    })
    console.log("go to the first page", this.page)
    this.setNavigationText(this.page)

  }
  move2lastPage() {
    this.page = this.totalOrder % this.limit + 1
    this.service.realTimeFetchItem({
      callBack: (result: { data: OrderModel[], total: number }) => this.service.publish(result.data), page: this.page, limit: this.limit, onError: (error) => {
        console.error(error)
      }
    })
    console.log("go to the last page", this.page)
    this.setNavigationText(this.page)

  }
  async setNavigationText(page: number) {
    this.navigationText = await this.translate.instant("pagination", { page })
    console.log("navigation text", this.navigationText)
  }



}
