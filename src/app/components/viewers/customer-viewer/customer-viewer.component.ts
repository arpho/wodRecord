import { Component, Input, OnInit } from '@angular/core';
import { CustomerModel } from 'src/app/modules/user/models/customerModel';

@Component({
  selector: 'app-customer-viewer',
  templateUrl: './customer-viewer.component.html',
  styleUrls: ['./customer-viewer.component.scss'],
})
export class CustomerViewerComponent implements OnInit {
 @Input() item:CustomerModel
  constructor() { }

  ngOnInit() {
  }

}
