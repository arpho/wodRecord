import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
import { UserModel } from 'src/app/modules/user/models/userModel';


@Component({
  selector: 'app-operator-viewer',
  templateUrl: './operator-viewer.component.html',
  styleUrls: ['./operator-viewer.component.scss'],
})
export class OperatorViewerComponent implements OnInit {
  @Input() item:UserModel
  @Output() action: EventEmitter<string> = new EventEmitter<string>()



  constructor() { }

  doAction(){
    this.action.emit(this.item.key)
  }

  ngOnInit() {
  }

}
