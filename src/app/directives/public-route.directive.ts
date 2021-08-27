import { Directive, ElementRef, OnInit } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import { getFamily } from '../state/family/index';

// Interfaces
import { IFamily } from '../state/family/family.reducer';

@Directive({
  selector: '[appPublicRoute]',
})
export class PublicRouteDirective implements OnInit {
  constructor(private elementRef: ElementRef, private store: Store) {}

  ngOnInit() {
    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      if (family._id) {
        this.elementRef.nativeElement.style.display = 'none';
      } else {
        this.elementRef.nativeElement.style.display = 'flex';
      }
    });
  }
}
