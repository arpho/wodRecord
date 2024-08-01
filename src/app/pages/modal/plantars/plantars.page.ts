import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { PlantarViewerComponent } from 'src/app/components/viewers/plantar-viewer/plantar-viewer.component';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { PlantarService } from 'src/app/services/Plantars/plantar.service';
import { CopyDesign2UserPage } from '../copy-design2-user/copy-design2-user.page';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Component({
  selector: 'app-plantars',
  templateUrl: './plantars.page.html',
  styleUrls: ['./plantars.page.scss'],
})
export class PlantarsPage implements OnInit {
  userKey: string
  listHead = "plantari"
  navigationText = ""
  totalCount: number
  page = 0
  showSpinner = true
  actionFunction: (item: ItemModelInterface) => Promise<void>
  headers = ["FirstName", "Surname", "Creation Date"]
  $totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  readonly totalcount: Observable<number> = this.$totalCount.asObservable()
  limit = 10
  subscription: Subscription = new Subscription()
  itemViewerComponent = PlantarViewerComponent

  constructor(
    public modal: ModalController,
    private params: NavParams,
    public service: PlantarService,
    private users: UsersService
  ) {
    this.actionFunction = async (plantar: ItemModelInterface) => {
      const modalPage = await modal.create({ component: CopyDesign2UserPage, componentProps: { plantar: plantar } })
      modalPage.present()
      this.showSpinner = true

    }
  }
  async ngOnInit() {
    this.service.$items.subscribe(data => {
      this.showSpinner = false
    })
    this.userKey = this.params.data.item.key
    try {
      const plantars = await this.service.fetchPlantars(this.userKey, await this.users.getToken())

      this.service.publish(plantars.data)
      this.$totalCount.next(plantars.totalCount)
      this.navigationText = await this.makeNavigationText(this.page, this.limit)
    }
    catch (err) {
      console.log("errore fetching plantar", err)
this.showSpinner = false
    }
    finally {
      this.showSpinner = false
    }

  }
  setLimit(newLimit: number) {
    throw new Error('Method not implemented.');
  }




  dismiss(value?) {
    this.modal.dismiss(value)
  }

  async makeNavigationText(page: number, limit: number) {
    return `pagina ${this.page != 0 ? this.page : 1} di ${await this.getTotalPages() != 0 ? await this.getTotalPages() : 1}`
  }

  async move2nextPage() {
    const pages = await this.getTotalPages()
    if (this.page < pages) {
      this.page += 1
      this.navigationText = await this.makeNavigationText(this.page, this.limit)
      const plantars = await this.service.fetchPlantars(this.userKey, await this.users.getToken(), this.page, this.limit)
      this.service.publish(plantars.data)
    }
  }

  async move2previousPage() {
    if (this.page >= 0) {
      this.page -= 1
      const plantars = await this.service.fetchPlantars(this.userKey, await this.users.getToken(), this.page, this.limit)
      console.log("plantars", plantars)
      this.navigationText = await this.makeNavigationText(this.page, this.limit)
      this.service.publish(plantars.data)
    }
  }

  async move2firstPage() {
    this.page = 0
    const plantars = await this.service.fetchPlantars(this.userKey, await this.users.getToken(), this.page, this.limit)
    console.log("plantars", plantars)
    this.navigationText = await this.makeNavigationText(this.page, this.limit)
    this.service.publish(plantars.data)
  }

  async move2lastPage() {
    this.page = await this.getTotalPages()
    const plantars = await this.service.fetchPlantars(this.userKey, await this.users.getToken(), this.page, this.limit)
    console.log("plantars", plantars)
    this.navigationText = await this.makeNavigationText(this.page, this.limit)
    this.service.publish(plantars.data)
  }


  getTotalPages(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.subscription.add(this.$totalCount.subscribe(totalCount => {
        const pages = Math.floor(totalCount / this.limit)
        resolve(pages)
      }))
    })
  }

}
