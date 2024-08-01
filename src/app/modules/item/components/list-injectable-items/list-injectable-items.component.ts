





import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { ItemHostDirective } from '../../directives/item-host.directive';
import { ItemsListInterface } from '../../models/itemlistInterface';
import { ItemsList } from '../../models/itemsList';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { Observable } from 'rxjs';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
//import {} from '../../../../components/payment-item/payment-item.component'

@Component({
  selector: 'app-list-injectable-items',
  templateUrl: './list-injectable-items.component.html',
  styleUrls: ['./list-injectable-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => ListInjectableItemsComponent)
  }]
})
export class ListInjectableItemsComponent implements OnInit, ControlValueAccessor {
  @Input() itemsList: ItemsList[]
  @Input() editPage
  @Input() createPage
  @Input() filterFunction: (item:ItemModelInterface)=>boolean =(item)=> true // filtro neutro di default
  @Input() titleFactory:(item:ItemModelInterface)=>string //funzione da usare per creare il  nome dell'oggetto da eliminare
  @Output() item2Delete  = new EventEmitter<ItemModelInterface> ()
  @Input() itemViewerComponent
  @Input() listHead = "lista componenti"
  @Input() items: Observable<Array<ItemModelInterface>>
  @Input() service: ItemServiceInterface
  disabled = false
  @ViewChild(ItemHostDirective, { static: true }) itemHost!: ItemHostDirective;

  // tslint:disable-next-line: ban-types
  onChange: any = () => { };
  // tslint:disable-next-line: ban-types
  onTouched: any = () => { };
  get value() {
    return this.itemsList;
  }

  loadItemComponent(itemValue: unknown) {
    const _viewContainerRef = this.itemHost.viewContainerRef;
    //removes all views in that container
    _viewContainerRef.clear();
    //Create an instance of the component
    const itemRef = _viewContainerRef.createComponent<ItemsListInterface>(this.itemViewerComponent)
    itemRef['item'] = itemValue // pass data to the component
  }
  constructor(private modalCtrl: ModalController,
    private alertCtrl:AlertController,
    private translate:TranslateService,
    private translateConfig:TranslateConfigService
    ) {
      translate.use(translateConfig.currentLang)
    }
  writeValue(val: any): void {
    this.itemsList = val;
    this.onChange(val);
    this.onTouched();
  }
  registerOnChange(fn: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnTouched(fn: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(disabled: boolean): void {
    this.disabled = disabled
  }

  set value(val) {
    this.itemsList = val;
    this.onChange(val);
    this.onTouched();
  }


  loaditemComponent(viewContainerRef: ViewContainerRef, itemViewerComponent: any, data: unknown) {
    const _viewContainerRef = this.itemHost.viewContainerRef;
    //removes all views in that container
    _viewContainerRef.clear();
  }
  ngOnInit() {


  }
  async deleteItem(item, slide: IonItemSliding, i: number) {
    const alert = await this.alertCtrl.create({
      message: ` ${await this.translate.get('sure2delete').toPromise()} ${this.titleFactory(item)} ?(${item.title})`,
      buttons: [
        {
          text: await this.translate.get("Annulla").toPromise(),
          role: "cancel",
          handler: () => { }
        },
        {
          text: await this.translate.get("Cancella").toPromise(),
          handler: () => {
            this.item2Delete.emit(item)
          }
        }
      ]
    });
    await alert.present();
    delete this.itemsList[i]
    this.item2Delete.emit(item)
    this.writeValue([...this.itemsList])
    slide.close()
  }

  async editItem(item, slide: IonItemSliding, i: number) {
    const componentProps = { data: item }
    const modal = await this.modalCtrl.create({ component: this.editPage, componentProps: componentProps })
    modal.onDidDismiss().then(result => {
      this.itemsList[i] = result.data as ItemsList
      this.writeValue(this.itemsList)
    })
    await modal.present()
    slide.close()
  }

  async create() {
    const modal = await this.modalCtrl.create({ component: this.createPage })
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.itemsList.push(result.data)
      }
      this.writeValue(this.itemsList)

    })
    await modal.present()
  }

}

