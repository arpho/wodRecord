import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { ProvidersModel } from 'src/app/models/providersModel';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';

@Component({
  selector: 'app-provider-viewer',
  templateUrl: './provider-viewer.component.html',
  styleUrls: ['./provider-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderViewerComponent implements OnInit {
  @Input() item: ProvidersModel

  constructor() {
  }

  ngOnInit() {
  }
  showDenominazione() {
    return this.item ? this.item.denominazione : ""
  }

}
