import { ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, ViewChildren, ViewContainerRef,EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ItemHostDirective } from '../../directives/item-host.directive';
import { ItemsListInterface } from '../../models/itemlistInterface';

@Component({
  selector: 'app-items-host',
  templateUrl: './items-host.component.html',
  styleUrls: ['./items-host.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ItemsHostComponent implements OnInit {
  @Input() item: unknown
  @Input() itemViewerComponent
  @Output() action = new EventEmitter<string>()
  @Output() innerAction = new EventEmitter<string>()//  we have to re-emit the signal from items-host to the parent component, with a different emitter to avoid stack overflow error
  @ViewChildren('itemHost', { read: ViewContainerRef }) itemHost!: ItemHostDirective;
  constructor(public cdRef: ChangeDetectorRef) { }
  async load() {
    const _viewContainerRef = this.itemHost['_results'][0]
    //removes all views in that container
    _viewContainerRef.clear();
    if (this.itemViewerComponent) {
      const itemRef = _viewContainerRef.createComponent<ItemsListInterface>(this.itemViewerComponent);
      // pass data to the component
      itemRef.instance.item = this.item
      if(itemRef.instance.action){
      this.action = itemRef.instance.action
      if(this.action.subscribe){
      this.action.subscribe(msg=>{
       this.innerAction.emit(msg)
      })}
    }
      this.cdRef.detectChanges()
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  ngAfterViewInit() {
    const ref = this.itemHost['_results'][0]

    this.load()
  }

  ngOnInit() {

  }
}
