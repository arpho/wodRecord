import { Injectable } from '@angular/core';
import { UsersService } from '../users.service';
import { configs } from 'src/app/configs/configs';

@Injectable({
  providedIn: 'root'
})
export class LoginRedirectorService {

  constructor(private users:UsersService) { }

  async redirectTo(){
    const user = await this.users.fetchLoggedUser()
    return user[configs.adminField]? configs.landingPage: configs.adminPage
  }
}
