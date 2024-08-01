import { BehaviorSubject, Observable } from "rxjs"

export class PaginationController {
    page: number = 0
    total: number
    items4page: number
    translationPage: string
    translationOf: string
    $navigationText:BehaviorSubject<string> = new BehaviorSubject("")
    readonly navigationText:Observable<string> = this.$navigationText.asObservable()// grid-injectableItems should subscribe to this or at least  should do it the page which the component is in  
    serviceHandler: (page: number, limit: number) => void
    /**
     * 
     * @param page :number starting page 0 based
     * @param serviceHandler:(page:number,items4page:number) function that calls the service for fetching the page, should bea wrpper to the service call that publish the values returned by the service
     * @param total :number  total of the items
     * @param items4page: number, number of items for page
     * @param translationPage: string translation for pagina
     * @param translationOf: string translation for di
     */
    constructor(page: number, serviceHandler: (page: number, items4page: number) => void, total: number, items4page: number, translationPage: string, translationOf: string) {
        this.page = page
        this.total = total
        this.items4page = items4page
        this.serviceHandler = serviceHandler
        this.translationOf = translationOf
        this.translationPage = translationPage
        this.$navigationText.next(this.makePaginationText())
    }
    makePaginationText(){

        return `${this.translationPage} ${this.page+1} ${this.translationOf} ${this.calculateLastPage()+1}`
    }
/**
 * 
 * @returns last page, 0based
 */
    calculateLastPage(){
        return this.total%this.items4page==0?Math.floor(this.total/this.items4page)-1:Math.floor(this.total/this.items4page)
    }

   async move2firstPage(){
        this.page=0
        this.serviceHandler(this.page,this.items4page)
        console.log("#*#",this.makePaginationText())
    this.$navigationText.next(this.makePaginationText())
    }
    async move2lastPage(){
        if(this.total%this.items4page==0)
            this.page= this.total%this.items4page
        else
            this.page= Math.floor(this.total/this.items4page) 
            this.serviceHandler(this.page,this.items4page)
        this.$navigationText.next(this.makePaginationText())
    }
    move2previousPage(){
        if(this.page>0){
            this.page-=1
            this.serviceHandler(this.page,this.items4page)
        this.$navigationText.next(this.makePaginationText())
        
        }
    }
    move2nextPage(){
        if((this.page+1)*this.items4page<this.total)
            this.page+=1
        this.serviceHandler(this.page,this.items4page)
    this.$navigationText.next(this.makePaginationText())
    }
}