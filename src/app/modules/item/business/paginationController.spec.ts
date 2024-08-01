import { PaginationController } from "./paginationController"

describe('paginationController',()=>{
    it('should create',()=>{
        const paginator = new PaginationController(0,(page:number,items4page:number)=>{},25,10,'pagina','di')
        expect(paginator).toBeDefined()
    })
    it('last page is correct',()=>{
        const paginator = new PaginationController(0,(page:number,items4page:number)=>{},25,10,'pagina','di')
        expect(paginator.calculateLastPage()).toBe(2)
        const paginator2 = new PaginationController(0,(page:number,items4page:number)=>{},20,10,'pagina','di')
        expect(paginator2.calculateLastPage()).toBe(1)
    })
    it('paginationText is correct',()=>{
        const paginator = new PaginationController(0,(page:number,items4page:number)=>{},25,10,'pagina','di')
        expect(paginator.makePaginationText()).toBe("pagina 1 di 3")
    })
    it('move2first should work',()=>{
        const paginator = new PaginationController(2,(page:number,items4page:number)=>{},25,10,'pagina','di')
        expect(paginator.calculateLastPage()).toBe(2)
        paginator.$navigationText.subscribe(text=>{
            if(text)
                expect(text).toBe("pagina 1 di 3")
        })
        paginator.move2firstPage()
        expect(paginator.page).toBe(0)
    })
    it('move2last should work',()=>{
        const paginator = new PaginationController(2,(page:number,items4page:number)=>{},25,10,'pagina','di')
        paginator.move2lastPage()
        expect(paginator.page).toBe(2)
        paginator.$navigationText.subscribe(text=>{
            if(text)
                expect(text).toBe("pagina 3 di 3")
        })
    })

    it("move2nextpage",()=>{
        const paginator = new PaginationController(1,(page:number,items4page:number)=>{},25,10,'pagina','di')
        paginator.move2nextPage()
        expect(paginator.page).toBe(2)
        expect(paginator.makePaginationText()).toBe("pagina 3 di 3")
        const paginator2 = new PaginationController(2,(page:Number,items4page:number)=>{},25,10,'pagina','di') // we are on the last page
        paginator2.move2nextPage() // page stay 2
        expect(paginator2.page).toBe(2)
    })
    it("move2previuousPage",()=>{
        const paginator = new PaginationController(1,(page:number,items4page:number)=>{},25,10,'pagina','di')
        paginator.move2previousPage()
        expect( paginator.page).toBe(0)
        const paginator2 = new PaginationController(0,(p:number,i:number)=>{},25,10,'pagina','di')
        paginator2.move2previousPage()
        expect(paginator2.page).toBe(0)
    })
})