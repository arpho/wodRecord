import { Component, Input, OnInit } from '@angular/core';
import { PatientModel } from 'src/app/modules/user/models/patientModel';

@Component({
  selector: 'app-patient-viewer',
  templateUrl: './patient-viewer.component.html',
  styleUrls: ['./patient-viewer.component.scss'],
})
export class PatientViewerComponent implements OnInit {

  constructor() { }
  @Input() item:PatientModel
  getBirthDate(){
    return this.item.birthDate?this.item?.birthDate.ItalianFormatDate():''
  }

  ngOnInit() {}

}
