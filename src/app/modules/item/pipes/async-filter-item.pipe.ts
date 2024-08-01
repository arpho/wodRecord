import { Pipe, PipeTransform } from '@angular/core';
import { ItemModelInterface } from '../models/itemModelInterface';

@Pipe({
  name: 'asyncFilterItem'
})
export class AsyncFilterItemPipe implements PipeTransform {

  async transform(allItems: ItemModelInterface[], args?: (item:ItemModelInterface)=>Promise<boolean>): Promise<any> {
console.log("filtering",allItems)
    const asyncFilter = async (arr:any[],predicate:(item:ItemModelInterface)=>Promise<boolean>)=>{{
      const results = await Promise.all(arr.map(predicate))
      return arr.filter((_v, index)=> results[index])
    }}
    const asyncRes = await asyncFilter(allItems,args)
    console.log("result",asyncRes)
    return asyncRes;
  }

}
