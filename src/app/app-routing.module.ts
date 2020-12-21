import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service'

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersService } from './servers/servers.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CanDeactivateGuard } from "./can-deactivate-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'users', component: UsersComponent, children: [
        { path: ':id/:name', component: UserComponent },
    ] },
    { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children: [
        { path: ':id', component: ServerComponent, resolve: {server: ServerResolver}},
        { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ] },
    {path: 'page-not-found', component: ErrorPageComponent, data: {message: "Page Not Found"}},
    {path: '**', redirectTo: '/page-not-found'}
]

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes)
        /*add an additional argument above, "useHash: true", to use with older browsers that do
        not return the index.html file when a 404 error occurs*/
    ],
    exports: [RouterModule]
})

export class AppRoutingModule {}