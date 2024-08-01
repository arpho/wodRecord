import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthorizationModel } from 'src/app/models/authorizations';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';
import { UsersService } from 'src/app/modules/user/services/users.service';

@Component({
  selector: 'app-authorization-viewer',
  templateUrl: './authorization-viewer.component.html',
  styleUrls: ['./authorization-viewer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class AuthorizationViewerComponent implements OnInit {
$owner:BehaviorSubject<CustomerModel>= new BehaviorSubject(new CustomerModel)
readonly owner: Observable<CustomerModel> = this.$owner.asObservable()
$user: BehaviorSubject<CustomerModel>=new BehaviorSubject(new CustomerModel())
readonly user:Observable<CustomerModel> = this.$user.asObservable()
  constructor(private service:UsersService) {
    }
  @Input()item:AuthorizationModel
  ngOnInit() {
this.service.getItem(this.item['ownerKey']).then(owner=>{
  this.$owner.next((new CustomerModel(owner)))
  this.service.getItem(this.item?.userKey).then(user =>{
    this.$user.next(new CustomerModel(user))

  })
})
  }
  createTime(){
    return new Date(this.item?.createTime)
  }

}
