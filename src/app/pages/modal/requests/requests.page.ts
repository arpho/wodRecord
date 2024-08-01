import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { RequestViewerComponent } from 'src/app/components/viewers/request-viewer/request-viewer.component';
import { KempelenRequest } from 'src/app/models/kempelenRequest';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { ItemizedKempelenService } from 'src/app/services/kempelen/itemized-kempelen.service';
import { KempelenService } from 'src/app/services/kempelen/kempelen-service.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit, OnDestroy {
  page = 0
  itemViewerComponent = RequestViewerComponent
  itemsList: KempelenRequest[]
  listHead = "plantari"
  subscription: Subscription = new Subscription()
  navigationText = ""
  $totalCount: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  readonly totalcount: Observable<number> = this.$totalCount.asObservable()
  limit = 10
  constructor(
    private params: NavParams,
    private modal: ModalController,
    private kempelen: KempelenService,
    public service: ItemizedKempelenService,
    private users: UsersService
  ) { }


  async ngOnInit() {
    this.key = this.params.data.userKey
    console.log("init request for", this.key)
    this.subscription.add(this.kempelen.fetchAllRequests(await this.users.getToken(), this.key, this.page, this.limit, { provider: "export" }).subscribe(async (data) => {
      this.$totalCount.next(data["totalCount"])

      console.log("data on init", data, await this.getTotalPages())


    }))


    this.fetchAndPublish()

    this.navigationText = await this.makeNavigationText()



  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  dismiss(value?) {
    this.modal.dismiss(value)
  }
  getTotalPages(): Promise<number> {
    return new Promise((resolve, reject) => {
      this.subscription.add(this.$totalCount.subscribe(totalCount => {
        const pages = Math.floor(totalCount / this.limit)
        console.log("pagine", pages)
        resolve(pages)
      }))
    })
  }
  async makeNavigationText() {
    return `pagina ${this.page != 0 ? this.page : 1} di ${await this.getTotalPages() != 0 ? await this.getTotalPages() : 1}`
  }
  matchRequests(matching: {}, data: KempelenRequest[]) {
    console.log("matching##@", data, "in to", matching)
    data.forEach(r => {
      const id = r.ID
      if (matching[id]) {

        //    console.log("match for",id,matching[id])
        matching[id]['push'](r)
        //  console.log("array",matching[id].length)
      }
      else {
        //console.log("no match for",id)
        matching[id] = [r]
      }
      //matching[id]= matching[id]?matching[id]['push'](r):matching[id]=[r]

    })
    console.log("matched##@", matching)
    return matching
  }

  async fetchAndPublish(query = {}) {
    this.service.fetchItemsWithTotalCount(this.key, this.page, this.limit, await this.users.getToken(), { "provider": "export" }).then(data => {
      console.log("itemized req", data)
      let matches = this.matchRequests({}, data["data"])
      console.log("matching", matches)
      this.itemsList = data["data"]
      this.$totalCount.next(data["totalCount"])
      this.service.publish(data["data"])

    }).catch(error => {
      console.error(error)
      alert(error)
    })
  }

  async move2nextPage() {
    const pages = await this.getTotalPages()
    if (this.page < pages) {
      this.page += 1
      this.navigationText = await this.makeNavigationText()
      this.fetchAndPublish()
    }
  }
  async move2previousPage() {
    const pages = await this.getTotalPages()
    if (this.page > 0) {
      this.page -= 1
      this.navigationText = await this.makeNavigationText()
      this.fetchAndPublish()
    }
  }
  key: string
  async move2firstPage() {
    console.log("first")
    this.page = 0
    this.navigationText = `pagina ${this.page} di ${await this.getTotalPages()}`
    this.service.fetchItems({}, this.page, this.limit, await this.users.getToken(), this.key).then(async requests => {
      console.log("itemized req", requests)
      this.itemsList = requests
      this.service.publish(requests)
      this.navigationText = await this.makeNavigationText()
    })
  }
  async move2lastPage() {
    console.log("lzast")
    this.subscription.add(this.$totalCount.subscribe(totalCount => {
      this.page = Math.floor(totalCount / this.limit)
    }))
  }
  async setLimit(newLimit: number) {
    console.log("new limit", newLimit, typeof newLimit)
    this.limit = newLimit
    this.service.fetchItems({}, this.page, this.limit, await this.users.getToken(), this.key).then(async requests => {
      console.log("itemized req", requests)
      this.itemsList = requests
      this.service.publish(requests)
      this.navigationText = await this.makeNavigationText()
    })
  }




}
