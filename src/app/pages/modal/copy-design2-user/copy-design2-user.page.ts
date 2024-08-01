import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { publish } from 'rxjs/operators';
import { CustomerViewerComponent } from 'src/app/components/viewers/customer-viewer/customer-viewer.component';
import { Plantar } from 'src/app/models/Plantar';
import { AuthorizationModel } from 'src/app/models/authorizations';
import { MyAlertService } from 'src/app/modules/helpers/services/alert/my-alert-service.service';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { AuthorizationsService } from 'src/app/services/autorizations/authorizations.service';
import { KempelenService } from 'src/app/services/kempelen/kempelen-service.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-copy-design2-user',
  templateUrl: './copy-design2-user.page.html',
  styleUrls: ['./copy-design2-user.page.scss'],
})
export class CopyDesign2UserPage implements OnInit,OnDestroy {

  buttons =[ ]
 plantar2Copy:Plantar
 itemViewerComponent = CustomerViewerComponent
 headers= ["firstName","lastName","email","display name"]
 listHead = "seleziona l'utente a cui inviare il plantare"
 hydeAddIcon = true
 navigationText=""
 actionFunction(item:CustomerModel){
  console.log("customer",item,this.plantar2Copy)
 }
totalCount: number
limit= 10
$totalCount: BehaviorSubject<number>= new BehaviorSubject<number>(0)
readonly totalcount:Observable<number> = this.$totalCount.asObservable()
subscription:Subscription= new Subscription()
page = 0
  constructor(
    private navParams:NavParams,
    public translate: TranslateService,
    public translateConfig:TranslateConfigService,
    public kempelen:KempelenService,
    private modal:ModalController,
    public users:UsersService,
    private authorizations:AuthorizationsService,
    private toaster:MyToastService,
    private alertCtrl:AlertController,
    private alerter:MyAlertService

  ) { }
  ngOnDestroy(): void {
   if(this.subscription){
    this.subscription.unsubscribe()
   }
  }
  async presentAlert(){
    const alert = await this.alertCtrl.create({
      header: 'A Short Title Is Best',
      subHeader: 'A Sub Header Is Optional',
      message: 'A message should be a short, complete sentence.',
      buttons: ['Action'],
    });

    await alert.present();
  }

  async ngOnInit() {
    this.buttons  =[ {
      text: await this.translate.get("share").toPromise(),
      icon: "share",
      data: {
        action: async (operator: UserModel) => {
          console.log("plantar",this.plantar2Copy)
          console.log("sending project to user",operator)
          const auth = new AuthorizationModel({
            userKey:operator.key,
            projectKey:this.plantar2Copy.ID,
            ownerKey: this.plantar2Copy.owner,
          })
          console.log("auth",auth)
          try{
          await this.authorizations.createItem( auth )
        this.toaster.presentToast( this.translate.instant("projectShared",{ID:auth.ID,userEmail:operator.email}))
        this.alerter.presentAlert({
          header: 'A Short Title Is Best',
          subHeader: 'A Sub Header Is Optional',
          message: 'A message should be a short, complete sentence.',
          buttons:[{text:"action",role:'cancel'}]
        })
        } 
          catch(e){
            console.log("error",e)
            this.toaster.presentToast("")
          } 
          finally{
          this.modal.dismiss()
        }
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
    },]
    this.translate.use(this.translateConfig.currentLang)
    this.plantar2Copy = this.navParams.get('plantar')
    console.log('plantar 2 copy',this.plantar2Copy)
this. actionFunction=async (customer:CustomerModel)=>{
  const token = await this.users.getToken()

  const authLeft = new AuthorizationModel({
    userKey:customer.key,
    owner: this.plantar2Copy.owner,
    plantarKey:this.plantar2Copy.ID,
    _id:this.plantar2Copy.left._id
  })
  const authRight = new AuthorizationModel({
    userKey:customer.key,
    owner: this.plantar2Copy.owner,
    plantarKey:this.plantar2Copy.ID,
    _id:this.plantar2Copy.right._id
  })
  console.log("authorizations",authLeft,authRight)
  Promise.all([
  this.authorizations.createItem(authLeft),
this.authorizations.createItem(authRight)
])
.then(res=>{
  console.log("done",res)
  alert("OK")
})
  console.log("customer",customer,this.plantar2Copy,token)
 }
    const handler = async (customers:CustomerModel[])=>{
      this.users.publish(customers.splice(this.page*this.limit,this.limit))
      this.$totalCount.next(customers.length)
      this.navigationText = await this.makeNavigationText(this.page,this.limit)
    }
   this.users.fetchRealTimeCustomers(handler)
  }

  fetchAndPublishCustomers(page:number,limit:number,query?:{}){

    const handler = (customers:CustomerModel[])=>{
      this.$totalCount.next(customers.length)
      this.users.publish(customers.splice(page*limit,limit))
    }
   this.users.fetchRealTimeCustomers(handler)
  }

async setLimit(newLimit:number){
  this.limit= newLimit
  this.fetchAndPublishCustomers(this.page,this.limit)
  this.navigationText =  await this.makeNavigationText(this.page,this.limit)
}

  async makeNavigationText(page:number,limit:number){
    return `pagina ${this.page!=0?this.page:1} di ${await this.getTotalPages()!=0?await this.getTotalPages():1}`
    }

  async move2nextPage(){
    const pages = await this.getTotalPages()
    if(this.page<pages){
     this.page+=1
     this.navigationText= await this.makeNavigationText(this.page,this.limit)
     this.fetchAndPublishCustomers(this.page,this.limit)
    }
  }

async move2previousPage(){
  if(this.page>=0){
    this.page-=1
    this.fetchAndPublishCustomers(this.page,this.limit)
  }
}

  async move2firstPage(){
    this.page=0
    this.fetchAndPublishCustomers(this.page,this.limit)
  }

  async move2lastPage(){
    this.page = await this.getTotalPages()
    this.fetchAndPublishCustomers(this.page,this.limit)
  }


  getTotalPages():Promise<number>{
    return new Promise((resolve,reject)=>{
      this.subscription.add(this.$totalCount.subscribe(totalCount=>{
        const pages = Math.floor(totalCount/this.limit)
        resolve(pages)
      }))
    } )
  }

  dismiss(value?:Object){
    this.modal.dismiss(value)
  }

}
