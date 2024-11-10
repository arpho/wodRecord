import { inject } from "@angular/core"
import { ActivatedRouteSnapshot, RouterStateSnapshot, MaybeAsync, GuardResult, Router } from "@angular/router"
import { UsersService } from "../services/users/users.service"
import { Auth } from "@angular/fire/auth"
import { AuthService } from "../services/auth/auth.service"


export const AuthGuardFactory = ()=>{
    const guard:(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ) => Promise<MaybeAsync<GuardResult>> = async (route:ActivatedRouteSnapshot,
        state: RouterStateSnapshot
      ) =>{
        const auth = inject(AuthService)
        const router = inject(Router)
        const isUserLogged =await auth.isUserLogged() 
   
        console.log("user is klogged",isUserLogged)
     {
          return isUserLogged?  true:     router.createUrlTree(["login"])
        }
       // return loggedUser.providerKey&&  loggedUser.enabled ? true:router.createUrlTree(["not-enabled"])
      }

      return guard
}