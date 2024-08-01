import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '../../../models/userModel';

@Component({
  selector: 'app-user-viewer',
  templateUrl: './user-viewer.component.html',
  styleUrls: ['./user-viewer.component.scss'],
})
export class UserViewerComponent implements OnInit {
@Input() item:UserModel
  constructor() { }

  ngOnInit() {

  }

}
