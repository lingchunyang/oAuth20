// configures NgModule imports and exports
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./component/login/login.component";
import { DocktorViewComponent } from './component/docktor-view/docktor-view.component';
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'doctor-view', component: DocktorViewComponent, canActivate:[AuthGuard]}

]; // sets up routes constant where you define your routes

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
