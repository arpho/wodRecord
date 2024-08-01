
import {Genere, ItemModelInterface} from '../modules/item/models/itemModelInterface'
import { ItemServiceInterface } from '../modules/item/models/ItemServiceInterface';
import { Value } from '../modules/item/models/value';
export class PrModel implements ItemModelInterface{
    title=''
    note?: string ;
    key: string=''
    id=''
    stringifiedDate=''
    prestazione=''
    src?: string | undefined;
    icon?: string | undefined;
    description?: string | undefined;
    getTitle?(): Value {
        return  new Value({value:this.title,label:'title'})
    }
    getCountingText(): { singular: string; plural: string; } {
        throw new Error('Method not implemented.');
    }
    getNote?(): Value {
        throw new Error('Method not implemented.');
    }
    build?(item: {}) {
      Object.assign(this,item)
    }
    load?(next?: () => void) {
        throw new Error('Method not implemented.');
    }
    isArchived?(): boolean {
        throw new Error('Method not implemented.');
    }
    archiveItem?(b: boolean) {
        throw new Error('Method not implemented.');
    }
    isArchivable?(): boolean {
        throw new Error('Method not implemented.');
    }
    setKey?(key: string): ItemModelInterface {
        throw new Error('Method not implemented.');
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error('Method not implemented.');
    }
    initialize(item: {}): ItemModelInterface {
        throw new Error('Method not implemented.');
    }
    getAggregate?(): Value {
        throw new Error('Method not implemented.');
    }
    aggregateAction?() {
        throw new Error('Method not implemented.');
    }
    hasQuickActions?(): boolean {
        throw new Error('Method not implemented.');
    }
    QuickAction?(key: string) {
        throw new Error('Method not implemented.');
    }
    serialize() {
        throw new Error('Method not implemented.');
    }
    getElement(): { element: string; genere: Genere; } {
        throw new Error('Method not implemented.');
    }
    url?: string | undefined;
    function?: (() => void) | undefined;
    onClick?: (() => void) | undefined;

}