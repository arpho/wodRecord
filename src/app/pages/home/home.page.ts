import { Component, OnDestroy, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { credentials } from 'src/app/configs/credentials';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { AuthService } from 'src/app/modules/user/services/auth.service';
import { KempelenService } from 'src/app/services/kempelen/kempelen-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit,OnDestroy {
  submitText=""
  token= ""
  showSpinner = false
  owner = ""
  subscription:Subscription = new Subscription()
  formFields=[
    new TextboxQuestion({
      key:"document_id",
      label:"document id"
    })
  ]
  usersToken= new Promise((resolve,reject)=>{})

  constructor(private service:KempelenService,private authorization:AuthService) { }
  ngOnDestroy(): void {
    if( this.subscription
  )
  {
this.subscription.unsubscribe()
  }
}
  filter(ev){
    console.log("typing",ev)
  }
 async fetchProjects(){
  this.showSpinner= true
  console.log("fetching projects")
    this.subscription.add(this.service.fetchProjectsList(await this.authorization.getPromisedToken()).subscribe(projects=>{
      console.log("got projects",projects)
      this.showSpinner= false
    },err=>{
      console.error(err)
      this.showSpinner= false
    }))

  }

  async submit(ev){
    console.log("submitted",ev)
    this.subscription.add(  this.service.fetchAsset(await this.authorization.getLoggedUser_Id(),ev.document_id,await this.authorization.getPromisedToken()).subscribe(asset=>{
      console.log("kempelen send this",asset)
    }, (err)=>{
      console.log("errore",err)
      console.error(err)
    }))
  }

  async ngOnInit() {
    this.usersToken = this.authorization.getPromisedToken()
    const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
    if(!isKarma) // we check it is not a test
    {
      const app = initializeApp(credentials.firebase)
      const auth = getAuth()
      const onAuthStateChangedHandler =async  (user)=>{
        this.submitText = `fetch document for user ${user?.uid}`
        this.token = await this.authorization.getPromisedToken()
        this.owner = await this.authorization.getLoggedUser_Id()
      }
      onAuthStateChanged(auth,onAuthStateChangedHandler)
    }

    this.service.borrowProject(await this.usersToken as unknown as string,"t3IeTXvDD4bBJePbDv0LGbOubO93","655e0ec87595c980e409658f").subscribe(data=>{console.log("borrowed project",data)})
  }

}
