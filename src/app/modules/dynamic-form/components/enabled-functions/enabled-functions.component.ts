import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { FunctionModel } from 'src/app/models/functionModel';
import { DateModel } from 'src/app/modules/user/models/birthDateModel';
import { AddFunctionPage } from '../../pages/modals/add-function/add-function.page';
import { resolve } from 'dns';
import { FunctionsService } from 'src/app/services/functions/functions.service';
import { title } from 'process';

@Component({
  selector: 'app-enabled-functions',
  templateUrl: './enabled-functions.component.html',
  styleUrls: ['./enabled-functions.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    multi: true,
    useExisting: EnabledFunctionsComponent
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EnabledFunctionsComponent implements OnInit, ControlValueAccessor, OnChanges {
  remove(arg0: any) {
    console.log("remove", arg0)
    this.enabledFunctions.splice(arg0, 1)
    this._loadedEnabledFunctions.next(this.enabledFunctions.map(f => {
      return { title: f.enabledFunction.title, endTime: f.endTime, key: f.enabledFunction.key }
    }))
  }
  _loadedEnabledFunctions: BehaviorSubject<{ key: string, title: string, endTime: number }[]> = new BehaviorSubject<{ key: string, title: string, endTime: number }[]> ([])
  readonly loadedEnabledFunctions = this._loadedEnabledFunctions.asObservable()
  _enabledFunctions: BehaviorSubject<{ key: string, title?: string, endTime: number }[]> = new BehaviorSubject<{ key: string, title?: string, endTime: number }[]>([])
  loadedFunctions: { key: string, endTime: number, title?: string }[] = []
  async ngOnInit(): Promise<void> {
    if (this.enabledFunctions) {
      const loadedEnabledFunctions = Promise.all(this.enabledFunctions.map((async item => {
        return { key: item['key'], endTime: item.endTime, title: (await this.service.getItem(item['key'])).title }
      })))
      this.loadedFunctions = await loadedEnabledFunctions
      this._loadedEnabledFunctions.next(await loadedEnabledFunctions)
    }
  }
  fetchTitle(key: string) {
    return new Promise(async (resolve, reject) => {
      if (key) {
        const funk = await this.service.getItem(key)
        resolve(funk.title)
      }
      else {
        reject(new Error('undefined key'))
      }
    })



  }
  showDate(arg0: number) {
    const endTime = new Date(arg0)
    return new DateModel(endTime).ItalianFormatDate()
  }
  @Input() enabledFunctions: { enabledFunction: FunctionModel, endTime: number }[] = []


  private onChange: Function = (password: string) => { };
  touched = false
  dissabled = false
  // tslint:disable-next-line: ban-types
  private onTouch: Function = () => { };
  private onValidationChange: any = () => { };
  set value(val: { enabledFunction: FunctionModel, endTime: number }[]) {
    this.enabledFunctions = val
  }

  constructor(
    private modalCtrl: ModalController,
    private service: FunctionsService
  ) { 
    service.realtimeFetchItems((funcs:{data:FunctionModel[],total:number})=>{
      service.publish(funcs.data)
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    //this._loadedEnabledFunctions.next(changes['enabledFunctions']['map']((func:FunctionModel)=>{return {title:func.title,endTime:func.endTime}}))
    //this._loadedEnabledFunctions.next(this.enabledFunctions.map((func)=>{ return {title:func.}}))

  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouch();
      this.touched = true;
    }
  }
  writeValue(obj: { enabledFunction: FunctionModel, endTime: number }[]): void {
    console.log("writing value",obj)
    this.enabledFunctions = obj
    if (obj) {
      const temp = obj.map((func) => {
        return { title: func.enabledFunction?.title, endTime: func.endTime, key: func['key'] }
      })
      this._loadedEnabledFunctions.next(temp)
    }

  }
  registerOnChange(fn: any): void {
    this.onChange = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }


  registerOnValidatorChange?(fn: () => void): void {
    this.onValidationChange = fn
  }
  setDisabledState?(isDisabled: boolean): void {
    this.dissabled = isDisabled
  }
  async addFunction() {
    const modal = await this.modalCtrl.create({
      component: AddFunctionPage
    })
    modal.onDidDismiss().then(data => {
      if (this.enabledFunctions && data.data) {
        this.enabledFunctions.push(data.data)

      }
      else {
        this.enabledFunctions = [data.data]
      }
      this.writeValue(this.enabledFunctions)
      this.onChange(this.enabledFunctions)
      this.markAsTouched()
    })
    await modal.present()
  }



}
