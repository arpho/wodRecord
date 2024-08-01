import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.scss'],
})
export class LogoutUserComponent implements OnInit {
  displayName = ""
  constructor(private users: UsersService) {


  }
  logout() {

    const auth = getAuth();
    signOut(auth)
  }

  async ngOnInit() {
    const user = await this.users.fetchLoggedUser()
    this.displayName = user.displayName ||user.email




  }
}