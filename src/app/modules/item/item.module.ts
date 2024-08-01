import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { MyItemComponent } from "./components/item/item.component";
import { ItemsListComponent } from "./components/items-list/items-list.component";
import { FilterItemsPipe } from "./pipes/filter-items.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { PageItemComponent } from "./components/page-item/page-item.component";
import { PageItemsListComponent } from "./components/page-items-list/page-items-list.page";
import { ShowValueComponent } from './components/show-value/show-value.component';
import { SorterItemsPipe } from './pipes/sorter-items.pipe';
import { ItemsFilterComponent } from './components/items-filter/items-filter.component';
import { FilterPopupPage } from './pages/filter-popup/filter-popup.page';
import { FilterPopupPageModule } from './pages/filter-popup/filter-popup.module';
import { SelectorItemsComponent } from './components/selector-items/selector-items.component';
import { ListInjectableItemsComponent } from "./components/list-injectable-items/list-injectable-items.component";
import { ItemHostDirective } from "./directives/item-host.directive";
import { ItemsHostComponent } from "./components/items-host/items-host.component";
import { TranslateModule } from "@ngx-translate/core";
import { AsyncFilterItemPipe } from './pipes/async-filter-item.pipe';
import { GridInjectableItemsComponent } from "./components/grid-injectable-items/grid-injectable-items.component";

@NgModule({
  declarations: [
    MyItemComponent,
    ItemsListComponent,
    FilterItemsPipe,
    AsyncFilterItemPipe,
    SelectorItemsComponent,
    ItemsFilterComponent,
    SorterItemsPipe,
    PageItemComponent,
    PageItemsListComponent,
    ShowValueComponent,
    ItemsFilterComponent,
    PageItemsListComponent,
    ItemHostDirective,
    GridInjectableItemsComponent,
    ItemsHostComponent,
    AsyncFilterItemPipe,
  ],
  imports: [CommonModule,
     IonicModule.forRoot(),
      ReactiveFormsModule,
      //ListInjectableItemsComponent,
    TranslateModule
    ],
  // entryComponents:[FilterPopupPage],
  exports: [
    MyItemComponent,
    ItemsListComponent,
    //ListInjectableItemsComponent,
    PageItemComponent,
    SorterItemsPipe,
    FilterItemsPipe,
    AsyncFilterItemPipe,
    SelectorItemsComponent,
    PageItemsListComponent,
    ItemsFilterComponent,
    GridInjectableItemsComponent,
    ShowValueComponent,
    ItemsHostComponent
    // FilterPopupPage
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ItemModule { }
