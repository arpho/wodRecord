import { Component, Input, OnInit } from '@angular/core';
import { LocationModel } from 'src/app/models/locationModel';

@Component({
  selector: 'app-location-viewer',
  templateUrl: './location-viewer.component.html',
  styleUrls: ['./location-viewer.component.scss'],
})
export class LocationViewerComponent implements OnInit{
  ngOnInit(): void {
  }
  @Input() item:LocationModel

  makeNumber(){
    return this.item.houseNumberSuffix?`${this.item.houseNumber}/${this.item.houseNumberSuffix}`:this.item.houseNumber
  }
}



