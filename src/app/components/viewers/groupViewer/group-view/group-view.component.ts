import { Component, OnInit, Input } from '@angular/core';
import { GroupModel } from 'src/app/models/groupModel';

@Component({
  selector: 'app-group-view',
  templateUrl: './group-view.component.html',
  styleUrls: ['./group-view.component.scss'],
})
export class GroupViewComponent implements OnInit {

  constructor() { }
  @Input() item: GroupModel
  ngOnInit() {
  }

}
