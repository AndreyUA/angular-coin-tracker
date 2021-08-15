import { Component, OnInit } from '@angular/core';

import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAccountInfo();
  }
}
