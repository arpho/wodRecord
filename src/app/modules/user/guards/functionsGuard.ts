import { CanActivateFn, Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { inject } from "@angular/core";
import { configs } from "src/app/configs/configs";

export function functionGuard(
    functionKey:string,
    locked:boolean,
    redirectRoute:string
):CanActivateFn{
    return async  ()=>{
        const usersService: UsersService = inject(UsersService)
        const router: Router = inject(Router);
       
      const isFunctionEnabled = !configs.locked || await usersService.loggedUserCanUseFunction(functionKey)
      console.log("user can use function",isFunctionEnabled)
      return isFunctionEnabled || router.createUrlTree([redirectRoute])
    }
}