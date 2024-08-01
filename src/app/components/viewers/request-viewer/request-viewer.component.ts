import { Component, Input, OnInit } from '@angular/core';
import { KempelenRequest } from 'src/app/models/kempelenRequest';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Component({
  selector: 'app-request-viewer',
  templateUrl: './request-viewer.component.html',
  styleUrls: ['./request-viewer.component.scss'],
})
export class RequestViewerComponent implements OnInit {
  @Input() item: KempelenRequest
  firstName:string
  lastName:string
  creationDate:string

  constructor() { }

  ngOnInit() {
  }
  hasLeft(){

    return this.item?.result?.result['foot_leftright'] && this.item?.result?.result['foot_leftright']['value'] && this.item?.result?.result['foot_leftright']['value'] =='L'?"True":"False"
  }
  hasRight(){

    return this.item?.result?.result['foot_leftright'] && this.item?.result?.result['foot_leftright']['value'] && this.item?.result?.result['foot_leftright']['value'] =='R'?"True":"False"
  }

}
