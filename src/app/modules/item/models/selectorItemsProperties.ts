import { QuestionProperties } from '../../dynamic-form/models/questionproperties';
import { ItemServiceInterface } from './ItemServiceInterface';
import { ItemModelInterface } from './itemModelInterface';
// tslint:disable:semicolon
export interface SelectorProperties extends QuestionProperties<ItemModelInterface> {
    service: ItemServiceInterface;
    text: string;
    createPopup?
    filterFunction?: ( value: ItemModelInterface | any,item?: ItemModelInterface,) => boolean
    ItemsFilterFunction?: (item: ItemModelInterface) => boolean
    sorterFunction?: (a: ItemModelInterface, b: ItemModelInterface) => number|undefined
    filterShownItems?:(e:ItemModelInterface)=> boolean // filtra gli elementi della comboBox
    data4Modal?:any

}
