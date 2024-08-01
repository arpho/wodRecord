import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { error } from 'console';
import { LocationModel } from 'src/app/models/locationModel';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-create-location',
  templateUrl: './create-location.page.html',
  styleUrls: ['./create-location.page.scss'],
})
export class CreateLocationPage implements OnInit {

  constructor(
    private modaalCtrl: ModalController,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private navParams: NavParams,
    private service: LocationsService,
    private toaster: MyToastService
  ) { }
  providerKey: string
  submitText = ""
  formFields = [
    new TextboxQuestion({
      label: "city",
      key: "city"
    }),
    new TextboxQuestion({
      label: "street",
      key: "street"
    }),
    new TextboxQuestion({
      label: "house number",
      key: "houseNumber"
    }),
    new TextboxQuestion({
      label: "house numbe suffix",
      key: "houseNumberSuffix"
    }),
    new TextboxQuestion({
      key: "zipCode",
      label: "zip code"
    })
  ]

  filter(ev) {
  }

  submit(ev) {
    const location = new LocationModel(ev)
    this.service.createItem(location, this.providerKey).then(async value => {
      location.key=value.id
      this.toaster.presentToast(await this.translate.get("coorectlyCreatedLocation").toPromise())
    }).catch(async error => {
      this.toaster.presentToast(await this.translate.get("troubleCreatingLocation").toPromise())
      console.log("error", error)
    })
    this.dismiss(location)
  }

  dismiss(location?: LocationModel) {
    this.modaalCtrl.dismiss(location)
  }
  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    this.providerKey = this.navParams.data.data4Modal
    console.log("params",this.navParams.data)
    console.log("providerKey",this.providerKey)
    this.submitText = await this.translate.get("submitLocation").toPromise()
  }

}
