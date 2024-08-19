// tslint: disable:semicolon
import { Value } from './value';
import { ItemServiceInterface } from './ItemServiceInterface';
import { AlertOptions} from '@ionic/core';
import { ItemFilterOPtions } from './ItemFIlterOptions';
import { QuickAction } from './QuickAction';
import { MenuItem } from '../../helpers/menu/models/MenuItemInterface';

export type Genere = 'o' | 'a';

export interface ItemModelInterface  extends MenuItem{
  title: string;
  note?: string;
  key: string;
  src?:string;
  icon?:string;
  description?:string;
  /**@deprecated */
  getTitle?(): Value;
  getCountingText(): {singular:string,plural:string}; // is the text shown on the countarea
  /**@deprecated */
  getNote?(): Value;

  build?(item: {});
  
  load?(next?: () => void); // load the item from firebase
  isArchived?(): boolean;
  archiveItem?(b: boolean);
  isArchivable?(): boolean;
  /**@deprecated */
  getValue2?(): Value;
  /**@deprecated */
  getValue3?(): Value;
  /**@deprecated */
  getValue4?(): Value;
  setKey?(key:string):ItemModelInterface
  getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface);
  initialize(item:{}):ItemModelInterface|undefined
  // tslint:disable-next-line: jsdoc-format
  /**ritorna l'etichetta e il valore da visualizzare del campo aggregato **/
  /**@deprecated */
  getAggregate?(): Value;
  /**@deprecated */
  aggregateAction?(): any | void;
  /**
   * @deprecated
   */
  hasQuickActions?(): boolean;
  /**
   * 
   * @param key @deprecated
   */
  QuickAction?(key:string);
  serialize /*
  serialize the model for storing in firebase
  */();
  getElement(): { element: string; genere: Genere };

  /**ritorna il nome del tipo di elemento per esempio scuola
   * @returns {element:string,genere:'o'|'a'}
   */
}
