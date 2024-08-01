import { Component, OnDestroy, OnInit } from '@angular/core';
import { EditProviderPage } from '../edit-provider/edit-provider.page';
import { CreateProviderPage } from '../create-provider/create-provider.page';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { ProvidersModel } from 'src/app/models/providersModel';
import { ProviderViewerComponent } from 'src/app/components/viewers/provider-viewer/provider-viewer.component';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.page.html',
  styleUrls: ['./list-provider.page.scss'],
})
export class ListProviderPage implements OnInit, OnDestroy {
  listHead = "Providers"
  subscriptions: Subscription = new Subscription()
  editPage = EditProviderPage
  navigationText = "pagina 1"
  page = 0
  limit = 10
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
        action: async (provider: ItemModelInterface) => {
          const modal = await this.modalCtrl.create({
            component: EditProviderPage,
            componentProps: { data: provider },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
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
          console.log("canceled", a)
        },
      },
    },
  ]
  createPage = CreateProviderPage
  totalProviders = 0
  headers = ["Providers"]
  hydeFab = false
  itemsList: ProvidersModel[] = []
  titleFactory = (item: ProvidersModel) => {
    return `${item.denominazione}`
  }
  itemViewerComponent = ProviderViewerComponent
  querySet = []

  constructor(
    public service: ProvidersService,
    private users: UsersService,
    public modalCtrl: ModalController,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService
  ) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
  }
  deleteItem(item) {
    return this.service.deleteItem(item)
  }
  async setNavigationText(page: number) {
    this.navigationText = await this.translate.instant("pagination", { page })
  }
  move2nextPage() {
    console.log("next page", this.page)
    this.page += 1
    console.log("next", this.page)
    this.service.fetchRealTimeProviders((auth) => { this.service.publish(auth.data) }, this.page, this.limit)
    this.setNavigationText(this.page)
  }
  move2previousPage() {
    console.log("go to previous page")
    if (this.page >= 1) {
      this.page -= 1
      this.service.fetchRealTimeProviders((auths) => {
        this.service.publish(auths.data)
      }, this.page, this.limit)
      console.log("go to previous page", this.page)
      this.setNavigationText(this.page)
    }
  }
  move2firstPage() {
    this.page = 0
    this.service.fetchRealTimeProviders((auth) => this.service.publish(auth.data), this.page, this.limit)
    console.log("go to the first page", this.page)
    this.setNavigationText(this.page)
  }
  move2lastPage() {
    this.page = this.totalProviders % this.limit + 1
    this.service.fetchRealTimeProviders((auth) => this.service.publish(auth.data), this.page, this.limit)
    console.log("go to the last page", this.page)
    this.setNavigationText(this.page)
  }
  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    const SignedUser = await this.users.fetchLoggedUser()
    this.hydeFab = !new CustomerModel(SignedUser).hasFunctionEnabled("HhdvZa2oc8lnEiPVm43s")
    this.subscriptions.add(this.translate.get("Providers").subscribe(value => {
      this.listHead = value
    }))
    const handler = (values: { data: ProvidersModel[], total: number }) => {
      this.service.publish(values.data)
      this.totalProviders = values.total
    }
    this.service.fetchRealTimeProviders(handler, this.page, this.limit)
  }
}
