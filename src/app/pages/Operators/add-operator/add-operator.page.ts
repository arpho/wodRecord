import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { TranslateConfigService } from 'src/app/services/translate/translate-config.service';
import {EmailExistValidatorFactory} from '../../../business/emailExistsValidator'
import { UsersService } from 'src/app/modules/user/services/users.service';
import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@material-ui/core';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/modules/user/models/userModel';
@Component({
  selector: 'app-add-operator',
  templateUrl: './add-operator.page.html',
  styleUrls: ['./add-operator.page.scss'],
})
export class AddOperatorPage implements OnInit {
  hydeSubmiTButton
  operatorFormEmailControl:FormControl
  emailPresent= false
  formFields = []
submitText="aggiungi operatore"
operatorEmail=''
hideSubmitButton= false
buttonDisabled= true
  constructor(
    public users:UsersService,
    private translate: TranslateService,
    private modslCtrl:ModalController,
    private toaster:MyToastService,
    private translateConfig: TranslateConfigService) { 
      
    }

  async ngOnInit() {
    this.translate.use(this.translateConfig.currentLang)
    const validator =  EmailExistValidatorFactory.getValidator(this.users)
    const validationTest  =   validator()({value:{email:"damicogiuseppe77@gmail.com"}} as AbstractControl) as Observable<ValidationErrors> 
    this.operatorFormEmailControl =  new FormControl('sdd',[Validators.required]);
    this.formFields= [new EmailQuestion({
      key:"email",
      label:"email operatore",
       asyncValidator:[validator()] 
    })]

  }
  async addOperator(){
    this.users.getLoggedUser().subscribe(user=>{
    this.users.getUserByEmail(this.operatorEmail)
    })
  } 
  async filter(ev){
    //console.log("typing",ev)
    const exists =  this.users.checkEmailExists(ev)
    const validator =  EmailExistValidatorFactory.getValidator(this.users)
    const validation = validator()(ev) 


  }

  dismiss(val?){
    this.modslCtrl.dismiss(val)
  }
  async submit(ev){
    console.log("submitting",ev)
    let loggedUser= await this.users.fetchLoggedUser()
    this.users.updateUserbyEmail(ev.email,{'companyKey':loggedUser.key}).then(async ()=>{
      this.toaster.presentToast( this.translate.instant("opearator2Company",{operatorEmail:ev.email}))
    })
  }
 

}
