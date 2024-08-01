import { Component } from "@angular/core";
import { Route } from "@angular/router";
import { authenticationGuard } from "./authenticationGuard";

@Component({ standalone: true, template: "" })
class DashboardComponent {}
describe("AuthenticationGuard", () => {
    let routes: Route[]
    beforeEach(() => {
        routes = [
          {
            path: "dashboard",
            canActivate: [authenticationGuard(false)],
            component: DashboardComponent,
          },
        ];
      });

      
    }
)