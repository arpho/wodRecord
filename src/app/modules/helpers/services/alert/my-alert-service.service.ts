import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {

  constructor(
    private AlertCtrl:AlertController
  ) { }

  /**
   * 
   * @param options {header:string,subHeader:string,message:string,action?:{text:string, role?:string,handler:()=>boolean}[]
   * @note if the handler return false the alert will not automatically be dismissed
  }
   */
  async presentAlert(options:{
    header:string,
    subHeader:string,
    message:string,
    buttons?:{text:string,handler?:()=>boolean, role?:string}[]
  })
  {
    console.log("presenting alert")
    const alert = await this.AlertCtrl.create(options)
    await alert.present()
  }
}

