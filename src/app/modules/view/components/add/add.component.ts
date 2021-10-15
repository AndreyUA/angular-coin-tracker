import { Component, OnInit, Input } from '@angular/core';

// Services
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  isDarkTheme!: boolean;

  @Input() text!: string;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {
    // TODO: add observer for this property!!!
    this.isDarkTheme = this.themeService.getIsDarkTheme();
  }
}
