import { Component, OnDestroy, OnInit } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { EditFunctionsPage } from '../edit-functions/edit-functions.page';
import { CreateFunctionsPage } from '../create-functions/create-functions.page';
import { FunctionViewerComponent } from 'src/app/components/viewers/function-viewer/function-viewer.component';
import { FunctionModel } from 'src/app/models/functionModel';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { Subscription } from 'rxjs';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { EditOPeratorPage } from '../../Operators/edit-operator/edit-operator.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-list-functions',
  templateUrl: './list-functions.page.html',
  styleUrls: ['./list-functions.page.scss'],
})
export class ListFunctionsPage implements OnInit,OnDestroy {
  functionKey=""
  showCard= false
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
      text:'show key',
      role:'view',
      icon:'key',
      data:{
        action: async (f:FunctionModel)=>{
          console.log("watching",f)
          this.functionKey = f.key
          this.showCard=!this.showCard
        }
      }
    },
    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (functionItem:ItemModelInterface)=>{
          const modal = await this.modalCtrl.create({component:EditFunctionsPage,componentProps:{ functionItem}})
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
 listHead=""
 subscriptions:Subscription = new Subscription()
  itemsList: FunctionModel[] = []
  titleFactory = (item:FunctionModel)=>{
    return item.title
  }

  deleteItem(fun){
    return this.service.deleteItem(fun.key)

  }
  editPage = EditFunctionsPage
  createPage = CreateFunctionsPage
  itemViewerComponent = FunctionViewerComponent
  hydePagination = true
  headers =["funzione","key","note","url"]
  hydeFab= true
  constructor(
    public service:FunctionsService,
    public modalCtrl:ModalController,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService
  ) { }
  ngOnDestroy(): void {
   this.subscriptions.unsubscribe()
  }

  ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
   this.subscriptions.add(this.translate.get("Funzioni").subscribe(value=>{
    this.listHead= value

  }))
    const handler = (funcs:{data: FunctionModel[],total:number}) => {
      this.service.publishData(funcs.data)
    }
    this.service.realtimeFetchItems(handler)
  }



}
