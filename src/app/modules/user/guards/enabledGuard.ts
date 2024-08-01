import { CanActivateFn, Router } from "@angular/router";
import { UsersService } from "../services/users.service";
import { inject } from "@angular/core";
import { configs } from "src/app/configs/configs";

export function enabledGuard(
    locked:boolean,
    redirectRoute:string
):CanActivateFn{
    return async  ()=>{
        const usersService: UsersService = inject(UsersService)
        const router: Router = inject(Router);
       
      const isUserEnabled = !configs.locked || await usersService.isEnabled(locked)
      console.log("user is enabled",isUserEnabled)
      return isUserEnabled || router.createUrlTree([redirectRoute])
    }
}