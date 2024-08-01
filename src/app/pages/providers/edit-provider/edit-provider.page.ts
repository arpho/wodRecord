import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { FunctionModel } from 'src/app/models/functionModel';
import { ProvidersModel } from 'src/app/models/providersModel';
import { EnabledFunctionsQuestion } from 'src/app/modules/dynamic-form/models/enabledFunctionsQuestion';
import { ListQuestion } from 'src/app/modules/dynamic-form/models/question-list';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { ProvidersService } from 'src/app/services/providers/providers.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { LocationModel } from "../../../models/locationModel"
import { EditLocationPage } from '../../locations/edit-location/edit-location.page';
import { CreateLocationPage } from '../../locations/create-location/create-location.page';
import { LocationViewerComponent } from 'src/app/components/viewers/location-viewer/location-viewer.component';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { EditGroupPage } from '../../groups/edit-group/edit-group.page';
import { CreateGroupPage } from '../../groups/create-group/create-group.page';
import { GroupViewComponent } from 'src/app/components/viewers/groupViewer/group-view/group-view.component';
import { GroupService } from 'src/app/services/groups/group.service';
import { group } from 'd3';
import { PatientsService } from 'src/app/services/patients/patients.service';
import { PatientViewerComponent } from 'src/app/components/viewers/patientViewer/patient-viewer/patient-viewer.component';
import { EditPatientPage } from '../../patients/edit-patient/edit-patient.page';
import { CreatePatientPage } from '../../patients/create/create-patient.page';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.page.html',
  styleUrls: ['./edit-provider.page.scss'],
})
export class EditProviderPage implements OnInit {
  provider
  submitText: string;
  providerKey
  formFields = []
  denominationLabel: string;
  updateProvider: string;

  constructor(
    public groupService:GroupService,
    public locationService: LocationsService,
    private navparams: NavParams,
    private modalCtrl: ModalController,
    private service: ProvidersService,
    private patientsService:PatientsService,
    //private locationService:Location
    private toaster: MyToastService,
    private translate: TranslateService,
    private functionsService: FunctionsService,
    private translateConfig: TranslateConfigService,

  ) {
    this.translateText()
  }
  async translateText() {
    this.denominationLabel = await this.translate.get('denominazione').toPromise()
    this.updateProvider = await this.translate.get('updateProvider').toPromise()
  }




  async ngOnInit() {
    //const label = await this.translate.get('denominazione').toPromise()
    this.translate.use(this.translateConfig.currentLang)
    console.log("navParams", this.navparams?.data.data)
    this.provider = this.navparams.data.data as ProvidersModel
    console.log('#* provider ',this.provider)
    this.providerKey = this.provider?.key
    console.log("provider key", this.providerKey)
    this.submitText = `${this.updateProvider} ${this.provider?.denominazione}`
    this.locationService.realtimeFetchItemsFromSubCollection(this.providerKey,(locations)=>{this.locationService.publish(locations.data)})
    this.groupService.realtimeFetchItemsFromSubCollection(this.providerKey,(groups)=>{this.groupService.publish(groups.data)})
    this.patientsService.realtimeFetchItemsFromSubCollection(this.providerKey,(patients)=>{this.patientsService.publish(patients.data)})
    this.translate.get("confirmDeleteLocation")  
    this.formFields = [
      new TextboxQuestion({
        key: "denominazione",
        label: this.denominationLabel,
        value: this.provider?.denominazione,
        required: true
      }),
      new ListQuestion({
        key:'groups',
        label:"groups",
        service: this.groupService,
        value:this.provider?.groups,
        editPage:EditGroupPage,
        itemUpdatedMessage:"updatedGroup",
        confirmDeleteMessage:"confirmDeletedGroup",
        createPage:CreateGroupPage,
        data4Modal:this.provider.key,
        deleteItem:(itemKey:string)=>{
          this.groupService.deleteItem(this.provider.key,itemKey).then(async (v)=>{
            this.toaster.presentToast(await this.translate.get("deletedGroupCorrectly").toPromise())
          }).catch(async (error)=>{
            this.toaster.presentToast(await this.translate.get("troubleDeletingGroup").toPromise() )
          })
        },
        headers:["title","key"],
        itemViewerComponent:GroupViewComponent
      }),
      new ListQuestion({
        key: 'locations',
        service: this.locationService,
        label: "locations",
        itemUpdatedMessage:"locationUpdated",
        confirmDeleteMessage:"confirmDeleteLocation",
        value: this.provider.locations,
        data4Modal: this.provider.key,
        deleteItem: (itemKey: string) => {
          console.log("deleting", itemKey, "on", this.providerKey) 
          this.locationService.deleteItem(itemKey, this.providerKey).then(async (v) => {
            this.toaster.presentToast(await this.translate.get("deletedLocation").toPromise())
          }).catch(async (error) => {
            this.toaster.presentToast(await this.translate.get("troubleDEletingLocation").toPromise())
          })
        },
        editPage: EditLocationPage,
        createPage: CreateLocationPage,
        headers: ["city", "street", "number", "zipCode"],
        itemViewerComponent: LocationViewerComponent
      }),
      new ListQuestion({
        key: 'patients',
        service: this.patientsService,
        label: "Patients",
        itemUpdatedMessage:"updatedPatient",
        confirmDeleteMessage:"confirmDeletePatient",
        data4Modal: this.provider.key,
        deleteItem: (itemKey: string) => {
          console.log("deleting", itemKey, "on", this.providerKey) 
          this.locationService.deleteItem(itemKey, this.providerKey).then(async (v) => {
            this.toaster.presentToast(await this.translate.get("deletedLocation").toPromise())
          }).catch(async (error) => {
            this.toaster.presentToast(await this.translate.get("troubleDEletingLocation").toPromise())
          })
        },
        editPage: EditPatientPage,
        createPage: CreatePatientPage,
        headers: ["first name", "last name","gender", "date of birth"],
        itemViewerComponent: PatientViewerComponent
      }),
      new EnabledFunctionsQuestion({
        key: "enabledFunctions",
        value: await Promise?.all(this.provider?.enabledFunctions?.map((f) => { return this.enabledFunctionAdapter(this, f) })),
        label: await this.translate.get("enabledFunctions")?.toPromise()
      })]
  }

  filter(ev) {
    console.log("typing", ev)
  }



  /**trasforma enabledFunction from {key:string,endTime:number} nel formato accettato da EnabledFunction.component
   * @param this: we must send a reference to this
   * @param arg: {key:string,endTime:number} where key is the function.key and andTime the time in ms of the exipiring date of the function
   */
  enabledFunctionAdapter(that, arg: {}): Promise<{ enabledFunction: FunctionModel, endTime: number }> {
    console.log("enabled function adpter ",arg)
    return new Promise(async (resolve, reject) => {
      try {
        const enabledFunction = await that.functionsService.getItem(arg['key'])
        resolve({ enabledFunction: enabledFunction, endTime: arg['endTime'] })
      }
      catch (err) {
        console.log(`function with key:${arg['key']} does not exist`)
        resolve(undefined)
      }
    })

  }

  close(provier?: ProvidersModel) {
    this.modalCtrl.dismiss(provier)
  }
  submit(ev) {
    const enabledFunctionsmapper = (f: any) => {
      return { key: f['enabledFunction'].key, endTime: f.endTime }
    }
    ev.enabledFunctions = ev.enabledFunctions.map(enabledFunctionsmapper)
    this.provider.initialize(ev)
    console.log("updated provider", this.provider)
    this.service.updateItem(this.provider).then(() => {
      this.toaster.presentToast("provider modified correctly")
      this.close(this.provider)
    }).catch(err => {
      this.toaster.presentToast(`something went wrong: ${err}`)
      console.error("error", err)
      this.close()
    })
  }

}
