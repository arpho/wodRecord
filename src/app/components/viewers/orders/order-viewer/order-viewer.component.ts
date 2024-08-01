import { Component, Input, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocationModel } from 'src/app/models/locationModel';
import { OrderModel } from 'src/app/modules/user/models/orderModel';
import { OrderStatus } from 'src/app/modules/user/models/orderStatus';
import { GroupService } from 'src/app/services/groups/group.service';
import { LocationsService } from 'src/app/services/locations/locations.service';
import { PatientsService } from 'src/app/services/patients/patients.service';

@Component({
  selector: 'app-order-viewer',
  templateUrl: './order-viewer.component.html',
  styleUrls: ['./order-viewer.component.scss'],
})
export class OrderViewerComponent implements OnInit {

  constructor(private locations: LocationsService,
    private patients: PatientsService,
    private groups: GroupService
  ) { }
  @Input() item: OrderModel
  $location: BehaviorSubject<string> = new BehaviorSubject("")
  $patient: BehaviorSubject<string> = new BehaviorSubject("")
  $group: BehaviorSubject<string> = new BehaviorSubject("")
  group: Observable<string> = this.$group.asObservable()
  readonly patient: Observable<string> = this.$patient.asObservable()
  readonly location: Observable<string> = this.$location.asObservable()
  showStatus() {
    console.log()
    return OrderStatus[this.item?.status]
  }

  async ngOnInit() {
    const location = await this.locations.getItemFromSubcollection(this.item.providerKey, this.item.locationKey)
    this.$location.next(String(location.getTitle().value))
    const patient = await this.patients.getItemFromSubcollection(this.item.providerKey, this.item.patientKey)
    this.$patient.next(patient.getDisplayName())
    const group = await this.groups.getItemFromSubcollection(this.item.providerKey, this.item.groupKey)
    this.$group.next(group.title)
  }

}
