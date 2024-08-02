import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { configs } from "src/app/configs/configs";
import { UsersService } from "./users.service";
import { inject } from "@angular/core";
export const loggedGuard =async ()=>{
    const users = inject(UsersService)
    const router = inject(Router)
    const loggedUser = await users.fetchLoggedUser()
    const redirect = loggedUser?true: router.navigate(['users/login'])
    const activate = !configs.locked?true:redirect
}

export const roleGuard= (role:number) =>async (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) =>{
    const  users = inject(UsersService)
    const router = inject(Router)
    const loggedUser = await users.fetchLoggedUser()
    let activate = loggedUser&& Number(loggedUser.role.value)<=role? true:router.navigate(['/users/not-authorized/non hai le autorizzazioni necessarie'])
    return ():CanActivateFn=>(
        route:ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    )=>{return !configs.locked? true:activate}

}

export const editProfileGuard = ()=>async (route:ActivatedRouteSnapshot,state:RouterStateSnapshot)=>{
    const  users = inject(UsersService)
    const router = inject(Router)
    const loggedUser= await users.fetchLoggedUser()
    return !configs.locked?true:loggedUser.key == route.data['key']

}

