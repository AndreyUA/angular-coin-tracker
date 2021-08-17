import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

// Store
import { select, Store } from '@ngrx/store';
import { getFamily } from './state/family';

// Interfaces
import { IFamily } from './state/family/family.reducer';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private router: Router, private store: Store) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let result: boolean = false;

    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      if (family._id) {
        this.router.navigate(['/family']);
        result = false;
      } else {
        result = true;
      }
    });

    return result;
  }
}
