import { Component, OnInit } from '@angular/core';
import * as authorizationsData from '../../../../../assets/authorizations.json'
import { AuthorizationModel } from 'src/app/models/authorizations';
import { AuthorizationsService } from 'src/app/services/autorizations/authorizations.service';
import { AuthorizationViewerComponent } from 'src/app/components/viewers/authorizationViewer/authorization-viewer/authorization-viewer.component';
import { EditAutorizationPage } from '../../edit/edit-autorization/edit-autorization.page';
import { CreateAutorizationPage } from '../../create/create-autorization/create-autorization.page';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { PlantarService } from 'src/app/services/Plantars/plantar.service';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { Plantar } from 'src/app/models/Plantar';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
@Component({
  selector: 'app-authorizations-list',
  templateUrl: './authorizations-list.page.html',
  styleUrls: ['./authorizations-list.page.scss'],
})
export class AuthorizationsListPage implements OnInit {
  editPage = EditAutorizationPage
  showLoading = false
  page=1
  limit=10
  totalAuths=0
  navigationText= "pagina 1"
  createPage = CreateAutorizationPage
  titleFactory = (item: AuthorizationModel) => {
    return "no title yet"
  }

async renewAuthorizations(){
  console.log( "renewing authorizations")
  this.showLoading= true
  this.service.realtimeFetchItems(async (auths) => {
    console.log("auth",auths)
    const auth4UserNotOwner = auths.data.filter((a)=>{
      return a.userKey&&a.ownerKey&&(a.userKey!=a.ownerKey)})
    console.log("auth to other users",auth4UserNotOwner)
    const coupleOfPlantars = await this.plantarsSrvc.fetchPlantars((await this.usersSrvr.fetchLoggedUser()).key,await this.usersSrvr.getToken(),0,-1) 
    const plantarsReducer = (acc:Plantar[],cur:Plantar)=>{
      return [...acc,cur.right,cur.left]
    }
    const plantars = coupleOfPlantars.data.reduce(plantarsReducer,[])
    console.log("plantars",plantars)
    const auths2Recreate = [...auth4UserNotOwner]
    plantars.forEach((a)=>{
      if(a){
      const auth = new AuthorizationModel({"userKey":a.owner,"ownerKey":a.owner,"_id":a._id}).setKey(String(a.ID))
      auths2Recreate.push(auth)}
    })
    this.showLoading= false
    console.log("new auth",auths2Recreate)

  },"",0,-1)
  
}
move2nextPage(){
  console.log("next page",this.page)
  this.page+=1
  console.log("next",this.page)
  this.service.realtimeFetchItems((auth) => this.service.publish(auth.data),this.page,this.limit)
  this.setNavigationText(this.page)
}
move2previousPage(){
  console.log("go to previous page")
  if(this.page>=1){
    this.page-=1
    this.service.realtimeFetchItems((auths) => {this.service.publish(auths.data)
    },this.page,this.limit)
  console.log("go to previous page",this.page)
    this.setNavigationText(this.page)
  }
}
move2firstPage(){
  this.page=0
  this.service.realtimeFetchItems((auth) => this.service.publish(auth.data),this.page,this.limit)
console.log("go to the first page",this.page)
  this.setNavigationText(this.page)

}
move2lastPage(){
  this.page= this.totalAuths%this.limit+1
  this.service.realtimeFetchItems((auth) => this.service.publish(auth.data),this.page,this.limit)
console.log("go to the last page",this.page)
  this.setNavigationText(this.page)

}
   async setNavigationText(page:number){
  this.navigationText = await this.translate.instant("pagination",{page})
}
  constructor(public service: AuthorizationsService,
    private usersSrvr:UsersService,
    private translate:TranslateService,
    private plantarsSrvc:PlantarService,
    private translateConfig:TranslateConfigService
  ) { }
  itemViewerComponent = AuthorizationViewerComponent
  deleteItem(ev){
    console.log("deleting", ev)
  }
  listHead
  headers = ["owner user", "enabled user", "Creation Date","Plantar ID"]
  hydeFab= true// nasconde il pulsante delle righe
  ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    this.setNavigationText(this.page)
    this.service.realtimeFetchItems((auths:{data:AuthorizationModel[],total:number}) =>{ 
      this.totalAuths= auths.total
      this.service.publish(auths.data),this.page,this.limit})

  }
}
