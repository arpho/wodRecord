import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { LocationViewerComponent } from 'src/app/components/viewers/location-viewer/location-viewer.component';
import { AlertController, ModalController } from '@ionic/angular';
import { MyAlertService } from 'src/app/modules/helpers/services/alert/my-alert-service.service';
import { Subscription } from 'rxjs';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { HomePage } from 'src/app/home/home.page';
import { serviceMocker } from 'src/app/modules/item/mockers/serviceMocker';
import { PrModel } from 'src/app/models/PrModel';
import { UsersService } from 'src/app/modules/user/services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';

@Component({
  selector: 'app-list-field',
  templateUrl: './list-field.component.html',
  styleUrls: ['./list-field.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: ListFieldComponent
  }],
})
export class ListFieldComponent implements OnInit, ControlValueAccessor, OnDestroy {
  subscription: Subscription = new Subscription()

  constructor(
    private modalCtrl: ModalController,
    public alertCtrl: MyAlertService,
    private AlertCtrl: MyAlertService,
    private toaster: MyToastService,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  @Input() value: ItemModelInterface[] = []
  disabled: boolean=false
  showAddButtonInPagination = true
  touched = false;
  hydeAddIcon = true
  addButtonPosition = "middle"
  @Input() itemViewerComponent = LocationViewerComponent
  @Input() headers = ["street", "city", "number"]
  @Input() editPage = HomePage
  @Input() createPage = HomePage
  @Input() service:ItemServiceInterface
  @Input() data4Modal: any // extra data needed by the modal page edit and create
  @Input() deleteItem: (itemKey: string) => void = (i:string)=>{}
  @Input() itemUpdatedMessage:string=''
  @Input() confirmDeleteMessage: string=''

  buttons = [

    {
      text: 'edit',
      icon: "eye",
      data: {
        action: async (item: ItemModelInterface) => {
          console.log("editing", item)
          const modal = await this.modalCtrl.create({
            component: this.editPage,
            componentProps: { data: item, extra: this.data4Modal },
            cssClass: "fullscreen"// toghether with the rule in global.scss opens the modal in full screen
          })
          modal.onDidDismiss().then(async (item) => {
            console.log("dismissed edit", item)
            if (item) {
              console.log("updated message",this.itemUpdatedMessage)
              this.toaster.presentToast(await this.translate.get(this.itemUpdatedMessage).toPromise())
              console.log("edited location", item)
             
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
            subHeader: await this.translate.get(this.confirmDeleteMessage).toPromise(),
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
  private onChange: Function = (values: ItemModelInterface[]) => { };
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };

  writeValue(value: ItemModelInterface[]): void {
    this.value = value
  }
  registerOnChange(fn: Function) {
    this.onChange = fn;
  }
  registerOnTouched(fn: Function) {
    this.onTouch = fn;
  }
  createdItem(item: ItemModelInterface) {
    console.log("new item", item)
    this.value.push(item)
    this.service.publish(this.value)
    this.onChange(this.value)
  }

  editedItem(item: ItemModelInterface) {
    /*     this.registerOnChange */ //#TODO 
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled
  }

  markAsTouched() {
    if (!this.touched) {
      console.log("touched")
      this.onTouch();
      this.touched = true;
    }
  }
  create() {
    console.log("creating")
  }

  ngOnInit() {
   console.log("itemUpdatedMessage",this.itemUpdatedMessage)
    this.onChange(this.value)
    this.translate.use(this.translateConfig.currentLang)
    this.subscription.add(this.service.items.subscribe(values => {
      console.log("subscripted value", values)
      this.markAsTouched()
      this.onChange(values)

    }))

  }


}
