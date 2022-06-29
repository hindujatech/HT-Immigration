import { Route } from '@angular/router';
import { AuthGuard } from '../_guards/auth.guard';
import { AssociateScreenComponent } from './associate-screen.component';

export const AssociateScreenRoute: Route[] = [
{
path: '',
component: AssociateScreenComponent,
canActivate: [AuthGuard],
children: [
]
}
];