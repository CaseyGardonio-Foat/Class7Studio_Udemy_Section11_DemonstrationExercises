import { Injectable } from "@angular/core";
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service'

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authService: AuthService, private router: Router) {};
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
    Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.isAuthenticated() 
            .then(
                    (authenticated: boolean)=> {
                        if (authenticated) {
                            return true;
                        } else {
                            this.router.navigate(['/']);
                            return false; //this return is optional; leaving it out won't affect functionality
                        }
                    }
            );
    }
    /*the demonstration implements both canActivate and canActivateChild, but only uses canActivateChild;
    confirmed that, in this case, only canActivateChild is necessary--it will function properly without
    canActivate (as long as the function code currently in canActivate is moved to canActivateChild) */
    
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}