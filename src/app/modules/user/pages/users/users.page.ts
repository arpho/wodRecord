import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { ItemModelInterface } from "src/app/modules/item/models/itemModelInterface";
import { UserModel } from "../../models/userModel";
import { EditUserPage } from "../edit-user/edit-user.page"
import { MyItemComponent } from "src/app/modules/item/components/item/item.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"]
})
export class UsersPage implements OnInit {
  itemViewerComponent = MyItemComponent
  public usersList: Array<UserModel>;
  public  editModalPage = EditUserPage
  listHead = "Providers"
  constructor(public service: UsersService) { }

  ngOnInit() {
    console.log('utenti page initialized')
  }
}
