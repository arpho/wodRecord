import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FunctionModel } from 'src/app/models/functionModel';

@Component({
  selector: 'app-function-viewer',
  templateUrl: './function-viewer.component.html',
  styleUrls: ['./function-viewer.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FunctionViewerComponent implements OnInit {
@Input() item: FunctionModel
  constructor() { }

  ngOnInit() {
  }
  showKey(){
    return this.item?`${this.item.key}`:''
  }
  showTitle(){
    return this.item ? `${this.item.title}`:''
  }
  showNote(){
    return this.item? `${this.item.note}`:''
  }
showIcon(){
  return this.item? this.item.icon:''
}
showUrl(){
  return this.item? this.item.url:''
}
}
