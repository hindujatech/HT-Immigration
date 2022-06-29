import { Routes } from "@angular/router";
import { AddDocumentComponent } from "./add-document/add-document.component";
import { AssociateScreenComponent } from "./associate-screen/associate-screen.component";
import { AssociateScreenRoute } from "./associate-screen/associate-screen.route";
import { ImmigrationViewComponent } from "./associate-screen/immigration-view/immigration-view.component";
import { LoginComponent } from "./login/login.component";
import { RequestCreateComponent } from "./request-create/request-create.component";
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'homepage', component: AssociateScreenComponent,canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent},
    {path:'request-create', component: RequestCreateComponent,canActivate:[AuthGuard]},
    {path:'request-edit/:id', component: RequestCreateComponent,canActivate:[AuthGuard]},
    {path:'add-document/:id', component: AddDocumentComponent,canActivate:[AuthGuard]},
    {path:'imgr-view/:id', component:ImmigrationViewComponent,canActivate:[AuthGuard]},
    {
        path: '404',
         component: AssociateScreenComponent
      },
      {
        path:'**',
        component:AssociateScreenComponent
      },

];