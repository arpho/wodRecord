import { QuestionProperties } from "../../dynamic-form/models/questionproperties";
import { ItemModelInterface } from "./itemModelInterface";
import { ItemServiceInterface } from "./ItemServiceInterface";

export interface listProperties extends QuestionProperties<ItemModelInterface>{
    value?:ItemModelInterface[]
    editPage,
    createPage,
    headers:string[], // headers of the list
    itemViewerComponent,
    data4Modal?:any
    deleteItem?:(itemKey:string)=>void
    service:ItemServiceInterface,
    itemUpdatedMessage: string, // key for i18 ally for message to be shown on on updating toast
    confirmDeleteMessage:string  // key for i18 ally for message to be shown on on deleting toast

    
}