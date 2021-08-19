import { Directive, Input, ElementRef, OnInit, DoCheck } from '@angular/core';

// Store
import { Store, select } from '@ngrx/store';
import { getFamily } from '../state/family/index';

// Interfaces
import { IFamily } from '../state/family/family.reducer';

@Directive({
  selector: '[appPrivateRoute]',
})
export class PrivateRoute implements OnInit, DoCheck {
  constructor(private elementRef: ElementRef, private store: Store) {}

  @Input() isPrivate: boolean = true;

  isVisible!: boolean;

  ngOnInit() {
    this.store.pipe(select(getFamily)).subscribe((family: IFamily) => {
      console.log(family._id);
      if (family._id) {
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }

  ngDoCheck() {
    if (this.isPrivate) {
      this.elementRef.nativeElement.style.display = this.isVisible
        ? 'flex'
        : 'none';
    } else {
      this.elementRef.nativeElement.style.display = this.isVisible
        ? 'none'
        : 'false';
    }
  }
}
