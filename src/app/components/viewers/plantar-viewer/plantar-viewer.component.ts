import { LensFlare } from '2023-09-23 preversionBeta/bin/js/three/three';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Plantar } from 'src/app/models/Plantar';

@Component({
  selector: 'app-plantar-viewer',
  templateUrl: './plantar-viewer.component.html',
  styleUrls: ['./plantar-viewer.component.scss'],
})
export class PlantarViewerComponent implements OnInit {
  @Input() item: Plantar
  @Input() actionFunction:(plantar:Plantar)=> void
  @Output() action: EventEmitter<Plantar> = new EventEmitter()
  constructor() { }
 get $firstNameOwner  (){
  return this.item?.$firstName
 }
 hasLeft(){
  return this.item?.left.hasLeft()
 }
 doAction(){
  this.action.emit(this.item)
 }

 hasRight(){
  return this.item.right.hasRight()
 }
  ngOnInit() {
  }

}
