import { inject } from "@angular/core";
import { AuthGuard } from "../services/authguard";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";

export function authenticationGuard(locked: boolean): CanActivateFn {
  return async () => {
    const usersService: UsersService = inject(UsersService);
    const router = inject(Router)
    if (!locked || await usersService.hasAccess()) {
      return true;
    }
    console.log("user must login ", usersService.hasAccess())

    usersService.login();
    return false;
  };
}