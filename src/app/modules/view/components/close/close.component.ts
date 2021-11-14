import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-close',
  templateUrl: '../../../../../assets/close.svg',
  styles: ['svg { fill: var(--secondary); width: 20px; height: 20px }'],
})
export class CloseComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
