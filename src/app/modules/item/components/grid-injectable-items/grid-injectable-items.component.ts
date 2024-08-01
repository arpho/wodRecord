
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ActionSheetController, ActionSheetOptions, AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { ItemHostDirective } from '../../directives/item-host.directive';
import { ItemsListInterface } from '../../models/itemlistInterface';
import { ItemsList } from '../../models/itemsList';
import { ItemServiceInterface } from '../../models/ItemServiceInterface';
import { Observable, Subscription } from 'rxjs';
import { ItemModelInterface } from '../../models/itemModelInterface';
import { TranslateService } from '@ngx-translate/core';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import { LocationModel } from 'src/app/models/locationModel';
import { PaginationController } from '../../business/paginationController';
//import {} from '../../../../components/payment-item/payment-item.component'


@Component({
  selector: 'app-grid-injectable-items',
  templateUrl: './grid-injectable-items.component.html',
  styleUrls: ['./grid-injectable-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: forwardRef(() => GridInjectableItemsComponent)
  }]
})
export class GridInjectableItemsComponent implements OnChanges, OnInit,OnDestroy {

  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Share',
      data: {
        action: 'share',
      },
    },
    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  @Input() itemsList: ItemsList[]
  @Input() editPage
  @Input() hydeAddIcon: boolean
  @Input() createPage
  @Input() actionFunction: (item: ItemModelInterface) => void // funzione eseguita dal viewer sull'item
  @Input() headers: string[] = ["Name", "Surname", "orthotic Type", "Creation Date", "Left", "Right", "version"]
  @Input() filterFunction: (item: ItemModelInterface) => boolean = (item) => true // filtro neutro di default
  @Input() titleFactory: (item: ItemModelInterface) => string //funzione da usare per creare il  nome dell'oggetto da eliminare
  @Output() item2Delete = new EventEmitter<ItemModelInterface>()
  @Input() itemViewerComponent
  @Input() paginationController:Observable<PaginationController>
  @Input() listHead = "lista componenti"
  @Input() items: Observable<Array<ItemModelInterface>>
  @Input() service: ItemServiceInterface
  @Input() navigationText = "pagina 1 di *"
  @Input() buttons: any[]
  @Input() showAddButtonInPagination
  @Input() emptyText: string
  showEmptyText = false
  //ActionSheetOptions.buttons: (string | ActionSheetButton<any>)[]
  @Output() move2previousPage: EventEmitter<void> = new EventEmitter<void>()
  @Output() move2firstPage: EventEmitter<void> = new EventEmitter<void>()
  @Output() move2nextPage: EventEmitter<void> = new EventEmitter<void>()
  @Output() move2lastPage: EventEmitter<void> = new EventEmitter<void>()
  @Output() changeLimit: EventEmitter<number> = new EventEmitter<number>()
  @Output() createdItem: EventEmitter<ItemModelInterface> = new EventEmitter<ItemModelInterface>()
  @Output() editedItem: EventEmitter<ItemModelInterface> = new EventEmitter<ItemModelInterface>()
  @Input() hydeFab: boolean
  @Input() hydePagination: boolean
  @Input() showSpinner: boolean
  @Input() data4Modal: any
  @Input() title: string
  subscriptions: Subscription = new Subscription();

  disabled = false
  @ViewChild(ItemHostDirective, { static: true }) itemHost!: ItemHostDirective;

  // tslint:disable-next-line: ban-types
  onChange: any = () => { };
  // tslint:disable-next-line: ban-types
  onTouched: any = () => { };
  get value() {
    return this.itemsList;
  }

  gotoPreviousPage() {
    console.log("previous")
    this.move2previousPage.emit()
    if(this.paginationController){
      this.paginationController.subscribe(ctrl=>{ctrl.move2previousPage()})

    }
  }
  gotoFirstPage() {
    this.move2firstPage.emit()
    if(this.paginationController)
    this.subscriptions.add(  this.paginationController.subscribe(ctrl=>{
    ctrl.move2firstPage()}))
  }
  gotoNextPage() {
    this.move2nextPage.emit()
    if (this.paginationController)
     this.subscriptions.add( this.paginationController.subscribe(ctrl=>{
    ctrl.move2nextPage()
      }))
  }
  gotoLastPage() {
    this.move2lastPage.emit()
    if(this.paginationController)
      this.subscriptions.add(this.paginationController.subscribe(ctrl=>{
    ctrl.move2lastPage()}))
  }
  setNewLimit(limit: Event) {
    this.changeLimit.emit(Number(limit['detail'].value))
    if(this.paginationController)
    this.subscriptions.add(  this.paginationController.subscribe(ctrl=>{
    
    ctrl.items4page =  Number(limit['detail'].value) }))
  }

  doAction(ev: any) {
    console.log(" inner action", ev)
    this.presentActionSheet(ev)
    this.action(ev)
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
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    private translateConfig: TranslateConfigService,
    private modal: ModalController
  ) {
    translate.use(translateConfig.currentLang)
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');

    if(this.subscriptions){
      this.subscriptions.unsubscribe()
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  actionOn(data) {
    console.log("data", data)
  }

  async presentActionSheet(item: ItemModelInterface) {
    if (this.buttons) {
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'Actions',
        buttons: this.buttons,
      });
      actionSheet.onDidDismiss().then((ev) => {
        if (ev.data && ev.data.action) {

          ev.data.action(item)
        }

      })

      await actionSheet.present();
    }
    else {
      console.log("no buttons defined!!")
    }
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
  action(item: ItemModelInterface) {
    console.log("action on ", item)
    if (this.actionFunction) {
      this.actionFunction(item)
    }
  }

  loaditemComponent(viewContainerRef: ViewContainerRef, itemViewerComponent: any, data: unknown) {
    const _viewContainerRef = this.itemHost.viewContainerRef;
    //removes all views in that container
    _viewContainerRef.clear();
  }
  ngOnInit() {
if(this.paginationController)
this.subscriptions.add(  this.paginationController.subscribe(ctrl=>{

ctrl.$navigationText.subscribe(txt=>{
  console.log("setting text",txt)
  this.navigationText = txt
})
  }))

console.log("paginator",this.paginationController)
  this.subscriptions.add(  this.service.items.subscribe(items => {
      this.showEmptyText = items.length == 0
    }))
    if (this.service) {

      this.service['serviceWorking'] = this.service['serviceWorking'] || false
    }
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
    const modal = await this.modalCtrl.create({ component: this.editPage, componentProps: componentProps, cssClass: 'fullscreen' })
    modal.onDidDismiss().then(result => {
      this.itemsList[i] = result.data as ItemsList
      this.writeValue(this.itemsList)
    })
    await modal.present()
    slide.close()
  }

  async create() {
    const modal = await this.modalCtrl.create({
      component: this.createPage,
      cssClass: "fullscreen",
      componentProps: { data4Modal: this.data4Modal }
    })
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.itemsList?.push(result.data)
        this.createdItem.emit(new LocationModel(result.data))
        this.writeValue(this.itemsList)
      }

    })
    await modal.present()
  }
}
