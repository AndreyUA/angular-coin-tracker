import { Component, OnInit } from '@angular/core';

// Services
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-plus',
  templateUrl: './plus.component.html',
  styleUrls: ['./plus.component.scss'],
})
export class PlusComponent implements OnInit {
  isDarkTheme!: boolean;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // TODO: add observer for this property!!!
    this.isDarkTheme = this.themeService.getIsDarkTheme();
  }
}
